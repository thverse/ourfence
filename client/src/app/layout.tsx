import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Providers } from "../components/providers";
import LeftSideBar from "@/components/layout/leftSideBar";
import MainContainer from "@/components/layout/mainContainer";
import TopBar from "@/components/layout/topBar";
import RightSideBar from "@/components/layout/rightSideBar";
import BottomBar from "@/components/layout/BottomBar";

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
          <main className="flex flex-row">
            <LeftSideBar />
            <MainContainer>
              <TopBar />
              {children}
            </MainContainer>
            <RightSideBar />
            <ToastContainer />
          </main>
          <BottomBar />
        </Providers>
      </body>
    </html>
  );
}
