import React from "react";
import LeftSideBarMenuItem from "./LeftSideBarMenuItem";
import { Bell, Home, UserCheck } from "lucide-react";
import PostCreateModal from "@/modules/post/components/PostCreateModal";
import { useUser } from "@/modules/user/hooks/useUser";
import { SignOutButton } from "@/modules/auth/components/SignOutButton";

const LeftSideBarMenuSection = () => {
  const { data: user } = useUser();

  const LeftSideBarMenuItems = [
    {
      title: "홈",
      icon: Home,
      path: "/",
    },
    {
      title: "알림",
      icon: Bell,
      path: "/notification",
    },
    {
      title: "내 정보",
      icon: UserCheck,
      path: `/profile/${user?.id}`,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
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
        <PostCreateModal />
      </nav>

      <div className="flex justify-end">
        <SignOutButton />
      </div>
    </div>
  );
};

export default LeftSideBarMenuSection;
