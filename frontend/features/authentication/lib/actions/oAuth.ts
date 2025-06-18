"use server";

import { auth, signOut } from "@/auth";
import { deleteSession } from "./session";

export const logout = async (): Promise<void> => {
  await Promise.all([deleteSession(), signOut({ redirectTo: "/landing" })]);
};
