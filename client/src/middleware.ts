import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/signup", "/signin"];
const protectedPaths = ["/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated =
    request.cookies.get("access_token") || request.cookies.get("refresh_token");

  // 미들웨어 검열이 필요없는 경로들
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 인증된 사용자는 모든 URL 접근가능
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
