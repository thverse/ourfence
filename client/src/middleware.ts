import { NextRequest, NextResponse } from "next/server";
import { authService } from "./modules/auth/auth.service";

const publicPaths = ["/signup", "/signin"];
const protectedPaths = ["/home", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated =
    request.cookies.get("accessToken") || request.cookies.get("refreshToken");

  // 미들웨어 검열이 필요없는 경로들
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 로그인하여 인증된 사용자가 로그인, 회원 가입 페이지 진입시 홈으로 리디렉트
  if (isAuthenticated && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 미인증된 사용자는 로그인 페이지로
  if (
    !isAuthenticated &&
    protectedPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|public/).*)",
};
