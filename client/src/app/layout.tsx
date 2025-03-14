import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Providers } from "../components/providers";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";

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
          <div className="flex justify-between max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto ">
            <div className="px-2 xsm:px-4 xxl:px-8 ">
              <LeftSideBar />
            </div>
            <main className="flex-1 lg:min-w-[600px] border-x-[2px] border-gray-200 ">
              {children}
            </main>
            <div className="hidden flex-1 lg:flex ml-4 md:ml-8 bg-green-200">
              <RightSideBar />
            </div>
          </div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
