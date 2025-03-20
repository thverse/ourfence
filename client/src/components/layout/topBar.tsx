"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const TopBar = () => {
  const [activeTab, setActiveTab] = useState<"myPosts" | "followingsPosts">(
    "myPosts"
  );

  return (
    <div className="flex font-bold border-b-[1px] h-14 border-gray-200 top-0 sticky bg-white bg-opacity-90 z-10">
      <div
        className="flex items-center justify-center h-full text-center flex-1 cursor-pointer hover:bg-gray-200"
        onClick={() => setActiveTab("myPosts")}
      >
        <span
          className={clsx(
            "p-4 border-b-4",
            activeTab === "myPosts" ? " border-blue-300" : "border-transparent"
          )}
        >
          My Posts
        </span>
      </div>
      <div
        className="flex items-center justify-center h-full text-center flex-1 cursor-pointer hover:bg-gray-200"
        onClick={() => setActiveTab("followingsPosts")}
      >
        <span
          className={clsx(
            "p-4 border-b-4",
            activeTab === "followingsPosts"
              ? " border-blue-300"
              : "border-transparent"
          )}
        >
          Following
        </span>
      </div>
    </div>
  );
};

export default TopBar;
