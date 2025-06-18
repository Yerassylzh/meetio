import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createIfDoesnotExist } from "./features/authentication/lib/actions/login";
import {
  createSession,
  deleteSession,
} from "./features/authentication/lib/actions/session";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [GitHub, Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await createIfDoesnotExist(user.email!, user.name!);
        await deleteSession();
        await createSession(
          { email: user.email!, name: user.name! },
          30 * 24 * 60 * 60 * 1000,
          true
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
