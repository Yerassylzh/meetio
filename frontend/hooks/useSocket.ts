"use client";

import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

function useSocket(socketUrl: string) {
  const socket = useMemo(() => {
    return io(socketUrl, { transports: ["websocket"] });
  }, [socketUrl]);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, [socket]);

  return socket;
}

export default useSocket;
