"use client";

import { RefObject, useCallback, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Socket } from "socket.io-client";

export function useCameraMuter(
  localVideoRef: RefObject<HTMLVideoElement | null>,
  socket: Socket,
  roomId: string
): [() => void, () => void, boolean] {
  const { user } = useAuth();
  const [isCameraMuted, setIsCameraMuted] = useState(false);

  const muteCamera = useCallback(() => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (!stream) return;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = false;
    });
    setIsCameraMuted(true);
    socket.emit("camera-off", user, roomId);
  }, [localVideoRef, user, roomId, socket]);

  const unmuteCamera = useCallback(() => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (!stream) return;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = true;
    });
    setIsCameraMuted(false);
    socket.emit("camera-on", user, roomId);
  }, [localVideoRef, user, roomId, socket]);

  return [muteCamera, unmuteCamera, isCameraMuted];
}

export default function useAudioMuter(
  socket: Socket,
  roomId: string
): [() => void, () => void, boolean] {
  const { user } = useAuth();
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const unmuteAudio = useCallback(() => {
    socket.emit("mic-on", user, roomId);
    setIsAudioMuted(false);
  }, [socket, user, roomId]);

  const muteAudio = useCallback(() => {
    socket.emit("mic-off", user, roomId);
    setIsAudioMuted(true);
  }, [socket, user, roomId]);

  return [muteAudio, unmuteAudio, isAudioMuted];
}
