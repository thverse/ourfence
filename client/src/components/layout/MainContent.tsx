import React, { useEffect } from "react";
import TabBar from "../TabBar";
import Feed from "@/modules/feed/components/Feed";
import { useTabBarStore } from "@/app/store";

const MainContent = () => {
  return (
    <>
      <Feed />
    </>
  );
};

export default MainContent;
