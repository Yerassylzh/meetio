"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
  useEffect,
} from "react";
import { UserVideo } from "../types/all";
import { notFound, useParams } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { Socket } from "socket.io-client";
import useAudioMuter, { useCameraMuter } from "./MeetContext.hooks";
import { checkIfRoomExists } from "../lib/actions";

interface MeetContextType {
  socket: Socket;
  // peer: PeerType | null;
  remoteVideos: UserVideo[];
  setRemoteVideos: Dispatch<SetStateAction<UserVideo[]>>;
  roomId: string;
  localVideoRef: RefObject<HTMLVideoElement | null>;
  muteCamera: () => void;
  unmuteCamera: () => void;
  isCameraMuted: boolean;
  muteAudio: () => void;
  unmuteAudio: () => void;
  isAudioMuted: boolean;
  stream: MediaStream;
}

const MeetContext = createContext<MeetContextType | undefined>(undefined);

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string;

export const MeetProvider = ({ children }: { children: ReactNode }) => {
  const socket = useSocket(socketUrl);
  const [remoteVideos, setRemoteVideos] = useState<UserVideo[]>([]);
  const { roomId } = useParams<{ roomId: string }>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [muteCamera, unmuteCamera, isCameraMuted] = useCameraMuter(
    localVideoRef,
    socket,
    roomId
  );
  const [muteAudio, unmuteAudio, isAudioMuted] = useAudioMuter(socket, roomId);

  const [roomExists, setRoomExists] = useState<boolean | null>(null);
  useEffect(() => {
    const wrapper = async () => {
      if (!isNaN(Number(roomId))) {
        setRoomExists(await checkIfRoomExists(roomId));
      } else {
        setRoomExists(false); // Not a number
      }
    };
    wrapper();
  }, [roomId]);

  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    if (!roomExists) {
      return;
    }

    const wrapper = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
    };
    wrapper();
  }, [roomExists]);

  if (roomExists === null) {
    return null;
  }

  if (roomExists === false) {
    notFound();
  }

  if (!stream) {
    return null;
  }

  return (
    <MeetContext.Provider
      value={{
        socket: socket,
        remoteVideos: remoteVideos,
        setRemoteVideos: setRemoteVideos,
        roomId: roomId,
        localVideoRef: localVideoRef,
        muteCamera: muteCamera,
        unmuteCamera: unmuteCamera,
        isCameraMuted: isCameraMuted,
        muteAudio: muteAudio,
        unmuteAudio: unmuteAudio,
        isAudioMuted: isAudioMuted,

        stream: stream,
      }}
    >
      {children}
    </MeetContext.Provider>
  );
};

export const useMeet = () => {
  const context = useContext(MeetContext);
  if (context === undefined) {
    throw new Error("useMeet must be used within a MeetContext");
  }
  return context;
};
