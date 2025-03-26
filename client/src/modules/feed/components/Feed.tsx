"use client";

import { useTabBarStore } from "@/app/store";
import Post from "../../post/components/Post";
import { useEffect } from "react";
import TabBar from "@/components/TabBar";

const Feed = () => {
  const { selectedTabId, setSelectedTabId } = useTabBarStore();
  console.log(selectedTabId);
  const tabBarItems = [
    { id: "myPosts", label: "내 게시물" },
    { id: "followingsPosts", label: "팔로잉 게시물" },
  ];

  useEffect(() => {
    if (!selectedTabId || selectedTabId !== "myPosts") {
      setSelectedTabId("myPosts");
    }
    window.scrollTo(0, 0);
  }, []);

  // if (selectedTabId !== "myPosts") return null;

  return (
    <div>
      <TabBar
        items={tabBarItems}
        initialActiveTab={tabBarItems[0].id}
        className="top-0 sticky"
      />
      <div className="flex flex-col gap-4">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Feed;
