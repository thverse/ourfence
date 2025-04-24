"use client";

import "pretendard/dist/web/static/pretendard.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import { Button } from "@/components/ui/button";
import { Bell, Home, MessageSquare, Plus, Search, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Providers } from "@/components/Providers";

// export const metadata: Metadata = {
//   title: "Ourfence",
//   description: "It's just a kind of social appications very simply.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // auth 관련 페이지 별도 레이아웃 적용
  const isAuthPage =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        <Providers>
          {isAuthPage ? (
            <div>{children}</div>
          ) : (
            <div className="flex justify-center min-h-screen">
              {/* 전체 컨테이너 */}
              <div className="flex w-full max-w-7xl mx-auto">
                {/* 왼쪽 사이드바 */}
                <LeftSideBar />
                {/* 중앙 피드 */}
                <main className="flex-1 max-w-2xl border-l border-r">
                  {children}
                </main>

                {/* 오른쪽 사이드바 */}
                <RightSideBar />
              </div>

              {/* 모바일 햄버거 메뉴 */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="md:hidden fixed bottom-4 right-4"
                  >
                    <Plus size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <nav className="flex flex-col gap-4">
                    <Button variant="ghost" className="flex gap-2">
                      <Home size={20} /> 홈
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                      <Search size={20} /> 탐색
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                      <Bell size={20} /> 알림
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                      <MessageSquare size={20} /> 메시지
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                      <User size={20} /> 프로필
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          )}

          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
