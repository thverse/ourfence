import React, { useEffect } from "react";
import TabBar from "../TabBar";
import Feed from "@/modules/feed/components/Feed";
import { useTabBarStore } from "@/app/store";

const MainContent = () => {
  const tabBarItems = [
    { id: "myPosts", label: "내 게시물" },
    { id: "followingsPosts", label: "팔로잉 게시물" },
  ];
  const { setSelectedTabId } = useTabBarStore();
  useEffect(() => {
    return () => {
      setSelectedTabId("myPosts"); // 다른곳으로 라우팅 될때 TabBar 상태값 초기화
    };
  }, [setSelectedTabId]);
  return (
    <>
      <TabBar
        items={tabBarItems}
        initialActiveTab={tabBarItems[0].id}
        className="top-0 sticky"
      />
      <Feed />
    </>
  );
};

export default MainContent;
