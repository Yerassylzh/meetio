import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { UserVideo } from "../types/all";
import { TokenUser } from "@/types/db";
import { useMeet } from "../context/MeetContext";

export default function usePeerSocket() {
  const { user } = useAuth();
  const {
    socket,
    peer,
    roomId,
    localVideoRef,
    setRemoteVideos,
    isAudioMuted,
    isCameraMuted,
  } = useMeet();

  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const wrapper = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.muted = true;
        localVideoRef.current.srcObject = stream;
      }
    };
    wrapper();

    const localVideoEl = localVideoRef.current;

    return () => {
      if (localVideoEl?.srcObject) {
        (localVideoEl.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [localVideoRef]);

  useEffect(() => {
    const wrapper = async () => {
      if (peer === null) {
        return;
      }

      peer.on("open", (id) => {
        socket.emit("register-user", id, user.name, user.email);
        socket.emit("join-room", roomId);
      });

      socket.on(
        "user-joined",
        (userPeerId: string, userName: string, userEmail: string) => {
          if (stream === null) return;

          const call = peer.call(userPeerId, stream, {
            metadata: {
              user: user,
              isAudioMuted: isAudioMuted,
              isCameraMuted: isCameraMuted,
            },
          });
          const remoteUser = { name: userName, email: userEmail };

          let recieved = false;
          call.on("stream", (userStream) => {
            if (recieved) return;
            recieved = true;

            setRemoteVideos((prev) => {
              return [
                ...prev,
                {
                  user: remoteUser,
                  srcObject: userStream,
                  isMuted: false,
                  isCameraOff: false,
                },
              ];
            });
          });
        }
      );

      peer.on("call", (call) => {
        if (stream === null) return;
        call.answer(stream);

        let recieved = false;
        call.on("stream", (userStream) => {
          if (recieved) return;
          recieved = true;

          setRemoteVideos((prev) => {
            const remoteVideo = {
              user: call.metadata.user as TokenUser,
              srcObject: userStream,
              isMuted: call.metadata.isAudioMuted as boolean,
              isCameraOff: call.metadata.isCameraMuted as boolean,
            };
            if (prev.length === 0) {
              return [remoteVideo];
            }
            return [...prev, remoteVideo];
          });
        });
      });

      socket.on("mic-on", (remoteUser: TokenUser) => {
        setRemoteVideos((remoteVideos) => {
          const video = remoteVideos.find(
            (video) => video.user.email === remoteUser.email
          );
          if (video === undefined) {
            console.error(
              `Cannot turn of the microphone on for ${remoteUser.email}`
            );
            return remoteVideos;
          }

          return [
            ...remoteVideos.filter(
              (remoteVideo) => remoteVideo.user.email !== video?.user.email
            ),
            {
              user: video.user,
              srcObject: video.srcObject,
              isMuted: false,
              isCameraOff: video.isCameraOff,
            } as UserVideo,
          ];
        });
      });

      socket.on("mic-off", (remoteUser: TokenUser) => {
        setRemoteVideos((remoteVideos) => {
          const video = remoteVideos.find(
            (video) => video.user.email === remoteUser.email
          );
          if (video === undefined) {
            console.error(
              `Cannot turn of the microphone off for ${remoteUser.email}`
            );
            return remoteVideos;
          }

          return [
            ...remoteVideos.filter(
              (remoteVideo) => remoteVideo.user.email !== video?.user.email
            ),
            {
              user: video.user,
              srcObject: video.srcObject,
              isMuted: true,
              isCameraOff: video.isCameraOff,
            } as UserVideo,
          ];
        });
      });

      socket.on("camera-on", (remoteUser: TokenUser) => {
        setRemoteVideos((remoteVideos) => {
          const video = remoteVideos.find(
            (video) => video.user.email === remoteUser.email
          );
          if (video === undefined) {
            console.error(
              `Cannot turn of the camera off for ${remoteUser.email}`
            );
            return remoteVideos;
          }

          return [
            ...remoteVideos.filter(
              (remoteVideo) => remoteVideo.user.email !== video?.user.email
            ),
            {
              user: video.user,
              srcObject: video.srcObject,
              isMuted: video.isMuted,
              isCameraOff: false,
            } as UserVideo,
          ];
        });
      });

      socket.on("camera-off", (remoteUser: TokenUser) => {
        setRemoteVideos((remoteVideos) => {
          const video = remoteVideos.find(
            (video) => video.user.email === remoteUser.email
          );
          if (video === undefined) {
            console.error(
              `Cannot turn of the camera off for ${remoteUser.email}`
            );
            return remoteVideos;
          }

          return [
            ...remoteVideos.filter(
              (remoteVideo) => remoteVideo.user.email !== video?.user.email
            ),
            {
              user: video.user,
              srcObject: video.srcObject,
              isMuted: video.isMuted,
              isCameraOff: true,
            } as UserVideo,
          ];
        });
      });

      socket.on("user-disconnected", (userEmail) => {
        setRemoteVideos((prev) => {
          return [...prev.filter((val) => val.user.email !== userEmail)];
        });
      });
    };

    wrapper();
  }, [
    socket,
    peer,
    roomId,
    user,
    setRemoteVideos,
    isAudioMuted,
    isCameraMuted,
    stream,
  ]);

  return socket;
}
