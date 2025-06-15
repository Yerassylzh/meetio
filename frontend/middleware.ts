import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  decryptToken,
  deleteSession,
} from "@/features/authentication/lib/actions/session";
import { auth } from "./auth";

const protectedRoutes = ["/"];
const landingPage = "/landing";
const authRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  let isAuth = cookie ? (await decryptToken(cookie)) !== undefined : false;
  if (!isAuth) {
    const session = await auth();
    isAuth = session !== null;
  }

  // Session is expired but still inside of storage
  if (cookie && !isAuth) {
    await deleteSession();
  }

  if (isAuth) {
    if (isAuthRoute || path == landingPage) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/landing", req.nextUrl));
    }
  }

  return NextResponse.next();
}
