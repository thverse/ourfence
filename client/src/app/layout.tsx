import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Providers } from "../components/providers";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Home, MessageSquare, Plus, Search, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Post from "@/components/layout/Post";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ourfence",
  description: "It's just a kind of social appications very simply.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex justify-center min-h-screen px-4">
            {/* 전체 컨테이너 */}
            <div className="flex w-full max-w-7xl mx-auto">
              {/* 왼쪽 사이드바 */}
              <LeftSideBar />
              {/* 중앙 피드 */}
              <main className="flex-1 max-w-2xl mx-auto border-l border-r">
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
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
// <Providers>
//   <div className="flex justify-between max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto ">
//     <div className="px-2 xsm:px-4 xxl:px-8 ">
//       <LeftSideBar />
//     </div>
//     <main className="flex-1 lg:min-w-[600px] border-x-[2px] border-gray-200 ">
//       {children}
//     </main>
//     <div className="hidden flex-1 lg:flex ml-4 md:ml-8 bg-green-200">
//       <RightSideBar />
//     </div>
//   </div>
//   <ToastContainer />
// </Providers>
//       </body>
//     </html>
//   );
// }
