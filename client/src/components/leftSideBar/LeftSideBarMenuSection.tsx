import React from "react";
import LeftSideBarMenuItem from "./LeftSideBarMenuItem";
import { Bell, Home, UserCheck } from "lucide-react";
import PostDialog from "@/modules/post/components/PostDialog";

const LeftSideBarMenuItems = [
  {
    title: "Home",
    icon: Home,
    path: "/",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
];

const LeftSideBarMenuSection = () => {
  return (
    <div className="flex flex-col">
      <nav className="flex flex-col gap-2 pb-5">
        {LeftSideBarMenuItems.map((item, idx) => {
          return (
            <LeftSideBarMenuItem
              key={idx}
              title={item.title}
              icon={item.icon}
              path={item.path}
            />
          );
        })}
      </nav>
      <PostDialog />
    </div>
  );
};

export default LeftSideBarMenuSection;
