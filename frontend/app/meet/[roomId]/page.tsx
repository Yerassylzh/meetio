"use client";

import { AuthProvider } from "@/context/AuthContext";
import { MeetProvider, useMeet } from "@/features/meet/context/MeetContext";
import usePeerSocket from "@/features/meet/hooks/usePeerSocket";
import { useMemo } from "react";
import React from "react";
import Controls from "@/features/meet/components/Controls";
import Header from "@/features/meet/components/Header";
import usePagingInfo from "@/features/meet/hooks/usePagingInfo";
import MyCard from "@/features/meet/components/MyCard";
import ParticipantCard from "@/features/meet/components/ParticipantCard";

export default function Wrapper() {
  return (
    <AuthProvider>
      <MeetProvider>
        <Page />
      </MeetProvider>
    </AuthProvider>
  );
}

function Page() {
  const { remoteVideos } = useMeet();

  usePeerSocket();

  const [currentPage, prevPage, nextPage, itemsPerPage, totalPages] =
    usePagingInfo(remoteVideos.length + 1);

  const userCards = useMemo(() => {
    const cards = [];
    for (
      let index = currentPage * itemsPerPage;
      index < (currentPage + 1) * itemsPerPage;
      index++
    ) {
      if (index === 0) {
        cards.push(<MyCard key={index} />);
      } else if (remoteVideos.length > index - 1) {
        cards.push(
          <ParticipantCard key={index} videoObj={remoteVideos[index - 1]} />
        );
      }
    }
    return cards;
  }, [currentPage, itemsPerPage, remoteVideos]);

  return (
    <div className="w-full relative h-screen bg-gray-100">
      <div className="absolute bottom-1 w-full text-center">
        <span className="text-white/60 text-[10px]">
          Page {currentPage + 1} of {totalPages} • {remoteVideos.length + 1}{" "}
          participants
        </span>
      </div>
      <div className="h-full w-full flex flex-col">
        <div className="h-full bg-gradient-to-br from-blue-500 to-blue-700 w-full p-6 shadow-2xl flex flex-col">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 mb-6">
            {userCards.map((card) => card)}
          </div>
        </div>
      </div>

      <Controls nextPage={nextPage} prevPage={prevPage} />
    </div>
  );
}
