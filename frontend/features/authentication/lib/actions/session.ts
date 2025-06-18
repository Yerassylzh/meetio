"use server";

import { TokenUser } from "@/types/db";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  user: TokenUser;
  expires: number;
  isOAuth: boolean;
};

export async function createSession(
  user: TokenUser,
  duration: number,
  isOAuth: boolean = false
) {
  const expiresAt = new Date(Date.now() + duration);
  const token = await generateToken({
    user: user,
    expires: expiresAt.getTime(),
    isOAuth: isOAuth,
  });

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function generateToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + payload.expires))
    .sign(encodedKey);
}

export async function decryptToken(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session: " + error);
    return undefined;
  }
}

export async function loadUserSessionFromCookies(): Promise<
  string | undefined
> {
  try {
    const session = (await cookies()).get("session")?.value;
    return session;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
