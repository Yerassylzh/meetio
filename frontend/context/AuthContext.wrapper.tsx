// components/AuthWrapper.tsx (Server Component - no "use client")
import { cookies } from "next/headers";
import { decryptToken } from "@/features/authentication/lib/actions/session";
import { AuthProvider } from "@/context/AuthContext";
import { TokenUser } from "@/types/db";
import { ReactNode } from "react";

export async function AuthWrapper({ children }: { children: ReactNode }) {
  let initialUser: TokenUser | null = null;
  let initialIsOAuth = false;

  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (sessionCookie) {
      const session = await decryptToken(sessionCookie);
      if (session) {
        initialUser = session.user;
        initialIsOAuth = false;
      }
    }
  } catch (error) {
    console.error("Failed to decrypt session:", error);
  }

  return (
    <AuthProvider user={initialUser} isOAuth={initialIsOAuth}>
      {children}
    </AuthProvider>
  );
}
