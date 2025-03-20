"use client";
import Link from "next/link";
import { useState } from "react";

const TopBar = () => {
  const [activeTab, setActiveTab] = useState<"myPosts" | "followingsPosts">(
    "myPosts"
  );

  return (
    <div className="p-4 flex font-bold border-b-[1px] border-gray-200 top-0 sticky bg-white bg-opacity-90 z-10">
      <div
        className="text-center flex-1 items-center cursor-pointer"
        onClick={() => setActiveTab("myPosts")}
      >
        <span
          className={
            activeTab === "myPosts" ? "pb-3 border-b-4 border-blue-200" : ""
          }
        >
          My Posts
        </span>
      </div>
      <div
        className="text-center flex-1 items-center cursor-pointer"
        onClick={() => setActiveTab("followingsPosts")}
      >
        <span
          className={
            activeTab === "followingsPosts"
              ? "pb-3 border-b-4 border-blue-200"
              : ""
          }
        >
          Following
        </span>
      </div>
    </div>
  );
};

export default TopBar;
