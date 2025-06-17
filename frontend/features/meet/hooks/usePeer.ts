import { useEffect, useState } from "react";
import type { Peer as PeerType } from "peerjs";

export default function usePeer(): PeerType | null {
  const [peer, setPeer] = useState<PeerType | null>(null);

  useEffect(() => {
    const loadPeer = async () => {
      const { Peer } = await import("peerjs");
      const newPeer = new Peer(); // optional: pass config like { key: 'peerjs', host: '...' }
      setPeer(newPeer);
    };

    loadPeer();
  }, []);

  useEffect(() => {
    return () => {
      peer?.destroy();
    };
  }, [peer]);

  return peer;
}
