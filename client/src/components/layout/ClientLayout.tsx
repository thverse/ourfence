"use client";

import "pretendard/dist/web/static/pretendard.css";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import { Button } from "@/components/ui/button";
import { Bell, Home, MessageSquare, Plus, Search, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Providers } from "@/components/Providers";
import LeftSideBarMenuSection from "@/components/leftSideBar/LeftSideBarMenuSection";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="z-10 md:hidden fixed right-1"
                  >
                    <Plus size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                  </SheetHeader>
                  <LeftSideBarMenuSection onClose={() => setOpen(false)} />
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
