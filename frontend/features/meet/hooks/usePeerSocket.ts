import { useAuth } from "@/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { UserVideo } from "../types/all";
import { TokenUser } from "@/types/db";
import { useMeet } from "../context/MeetContext";
import type { MediaConnection } from "peerjs";
import usePeer from "./usePeer";

export default function usePeerSocket() {
  const { user } = useAuth();
  const {
    socket,
    roomId,
    localVideoRef,
    setRemoteVideos,
    isAudioMuted,
    isCameraMuted,
    stream,
  } = useMeet();
  const peer = usePeer();

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.muted = true;
      localVideoRef.current.srcObject = stream;
    }

    const localVideoEl = localVideoRef.current;

    return () => {
      if (localVideoEl?.srcObject) {
        (localVideoEl.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [localVideoRef, stream]);

  const handlePeerOpen = useCallback(
    (id: string) => {
      console.log(stream);
      socket.emit("register-user", id, user.name, user.email);
      socket.emit("join-room", roomId);
    },
    [socket, roomId, user, stream]
  );

  const handleUserJoined = useCallback(
    (userPeerId: string, userName: string, userEmail: string) => {
      if (!peer || !stream) return;
      const call = peer.call(userPeerId, stream, {
        metadata: {
          user: user,
          isAudioMuted: false,
          isCameraMuted: false,
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
    },
    [peer, stream, setRemoteVideos, user]
  );

  const handlePeerCall = useCallback(
    (call: MediaConnection) => {
      if (!stream) return;
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
    },
    [stream, setRemoteVideos]
  );

  const handleMicOn = useCallback(
    (remoteUser: TokenUser) => {
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
    },
    [setRemoteVideos]
  );

  const handleMicOff = useCallback(
    (remoteUser: TokenUser) => {
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
    },
    [setRemoteVideos]
  );

  const handleCameraOn = useCallback(
    (remoteUser: TokenUser) => {
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
    },
    [setRemoteVideos]
  );

  const handleCameraOff = useCallback(
    (remoteUser: TokenUser) => {
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
    },
    [setRemoteVideos]
  );

  const handleUserDisconnected = useCallback(
    (userEmail: string) => {
      setRemoteVideos((prev) => {
        return [...prev.filter((val) => val.user.email !== userEmail)];
      });
    },
    [setRemoteVideos]
  );

  useEffect(() => {
    peer?.on("open", handlePeerOpen);
    peer?.on("call", handlePeerCall);

    socket.on("user-joined", handleUserJoined);
    socket.on("mic-on", handleMicOn);
    socket.on("mic-off", handleMicOff);
    socket.on("camera-on", handleCameraOn);
    socket.on("camera-off", handleCameraOff);
    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      peer?.off("open", handlePeerOpen);
      peer?.off("call", handlePeerCall);
      socket.off("user-joined", handleUserJoined);
      socket.off("mic-on", handleMicOn);
      socket.off("mic-off", handleMicOff);
      socket.off("camera-on", handleCameraOn);
      socket.off("camera-off", handleCameraOff);
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, [
    socket,
    peer,
    handlePeerCall,
    handlePeerOpen,
    handleUserJoined,
    handleMicOn,
    handleMicOff,
    handleCameraOn,
    handleCameraOff,
    handleUserDisconnected,
  ]);

  return socket;
}
