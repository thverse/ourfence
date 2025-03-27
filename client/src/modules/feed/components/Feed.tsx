"use client";

import { useTabBarStore } from "@/app/store";
import Post from "../../post/components/Post";
import { useLayoutEffect } from "react";
import TabBar from "@/components/TabBar";

const Feed = () => {
  const { selectedTabId } = useTabBarStore();
  const tabBarItems = [
    { id: "myPosts", label: "내 게시물" },
    { id: "followingsPosts", label: "팔로잉 게시물" },
  ];

  //탭 변경시 스크롤 맨 위로 이동
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTabId]);

  return (
    <div>
      <TabBar
        items={tabBarItems}
        initialActiveTab={tabBarItems[0].id}
        className="top-0 sticky"
      />
      <div className="flex flex-col gap-4">
        {selectedTabId === "myPosts" ? (
          <div>
            <Post />
            <Post />
            <Post />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Feed;
