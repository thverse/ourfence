import React, { useEffect } from "react";
import TopBar from "./TopBar";
import Feed from "@/modules/feed/components/Feed";
import { useTopBarStore } from "@/app/store";

const MainContent = () => {
  const { setSelectTopBarItem } = useTopBarStore();
  useEffect(() => {
    return () => {
      setSelectTopBarItem("myPosts"); // 다른곳으로 라우팅 될때 TopBar 상태값 초기화
    };
  }, [setSelectTopBarItem]);
  return (
    <>
      <TopBar />
      <Feed />
    </>
  );
};

export default MainContent;
