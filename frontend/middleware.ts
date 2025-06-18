import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  decryptToken,
  deleteSession,
} from "@/features/authentication/lib/actions/session";

const protectedRoutes = ["/meet/"];
const landingPage = "/landing";
const authRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    path === "/" || protectedRoutes.some((value) => path.startsWith(value));
  const isAuthRoute = authRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const isAuth = cookie ? (await decryptToken(cookie)) !== undefined : false;

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
