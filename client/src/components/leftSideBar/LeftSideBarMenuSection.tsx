import React from "react";
import LeftSideBarMenuItem from "./LeftSideBarMenuItem";
import { Bell, Home, UserCheck } from "lucide-react";
import PostDialog from "@/modules/post/components/PostDialog";
import { useUser } from "@/modules/user/hooks/useUser";

const LeftSideBarMenuSection = () => {
  const { data: user } = useUser();

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
    {
      title: "Profile",
      icon: UserCheck,
      path: `/profile/${user?.id}`,
    },
  ];

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
