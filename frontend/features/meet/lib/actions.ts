"use server";

import { prisma } from "@/lib/prisma";

export async function checkRoomExists(roomId: string): Promise<boolean> {
  const room = await prisma.room.findUnique({
    where: { id: Number(roomId) },
  });
  return room !== null;
}

export async function getNewRoomId(): Promise<string> {
  const newRoom = await prisma.room.create({
    data: {},
  });
  return newRoom.id.toString();
}

export async function deleteRoom(roomId: string): Promise<void> {
  await prisma.room.delete({
    where: { id: Number(roomId) },
  });
}

export async function checkIfRoomExists(roomId: string) {
  return (
    (await prisma.room.findUnique({
      where: { id: Number(roomId) },
    })) !== null
  );
}
