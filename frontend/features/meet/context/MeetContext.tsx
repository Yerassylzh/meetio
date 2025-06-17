"use client";

import type { Peer as PeerType } from "peerjs";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { UserVideo } from "../types/all";
import { useParams } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { Socket } from "socket.io-client";
import useAudioMuter, { useCameraMuter } from "./MeetContext.hooks";
import usePeer from "../hooks/usePeer";

interface MeetContextType {
  socket: Socket;
  peer: PeerType | null;
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
}

const MeetContext = createContext<MeetContextType | undefined>(undefined);

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string;

export const MeetProvider = ({ children }: { children: ReactNode }) => {
  const socket = useSocket(socketUrl);
  const peer = usePeer();
  const [remoteVideos, setRemoteVideos] = useState<UserVideo[]>([]);
  const { roomId } = useParams<{ roomId: string }>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [muteCamera, unmuteCamera, isCameraMuted] = useCameraMuter(
    localVideoRef,
    socket,
    roomId
  );
  const [muteAudio, unmuteAudio, isAudioMuted] = useAudioMuter(socket, roomId);

  return (
    <MeetContext.Provider
      value={{
        socket: socket,
        peer: peer,
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
