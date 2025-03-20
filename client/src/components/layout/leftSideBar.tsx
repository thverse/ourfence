"use client";

import LeftSideBarMenuSection from "../leftSideBar/LeftSideBarMenuSection";
import LeftSideBarHeader from "../leftSideBar/LeftSideBarHeader";

const LeftSideBar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 p-4 sticky top-0 h-screen">
      <LeftSideBarHeader />
      <LeftSideBarMenuSection />
    </aside>
  );
};

export default LeftSideBar;
