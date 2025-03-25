"use client";

import { useTabBarStore } from "@/app/store";
import Post from "../../post/components/Post";
import { useEffect } from "react";

const Feed = () => {
  const { selectedTabId } = useTabBarStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTabId]);

  if (selectedTabId !== "myPosts") {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
