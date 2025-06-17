import { prisma } from "@/lib/prisma";
import { User } from "@/types/db";

export async function getAllUsers(): Promise<User[]> {
  return (await prisma.user.findMany()) as User[];
}
