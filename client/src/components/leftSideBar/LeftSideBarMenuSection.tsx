import React from "react";
import LeftSideBarMenuItem from "./LeftSideBarMenuItem";
import { Bell, Home, UserCheck } from "lucide-react";
import PostCreateModal from "@/modules/post/components/PostCreateModal";
import { useCurrentUser } from "@/modules/user/hooks/useUser";
import { SignOutButton } from "@/modules/auth/components/SignOutButton";
import { NotificationIcon } from "@/modules/notification/components/NotificationIcon";

interface LeftSideBarMenuSectionProps {
  onClose?: () => void;
}

const LeftSideBarMenuSection = ({ onClose }: LeftSideBarMenuSectionProps) => {
  const { data: user } = useCurrentUser();

  const LeftSideBarMenuItems = [
    {
      title: "홈",
      icon: Home,
      path: "/",
      iconSize: 25,
    },
    {
      title: "알림",
      customIcon: <NotificationIcon size={25} userId={user?.id} />,
      path: "/notification",
      iconSize: 25,
    },
    {
      title: "내 정보",
      icon: UserCheck,
      path: `/profile/${user?.id}`,
      iconSize: 25,
    },
  ];

  const handleItemClick = () => {
    onClose?.();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <nav className="flex flex-col gap-2 pb-5">
        {LeftSideBarMenuItems.map((item, idx) => {
          return (
            <div key={idx} onClick={handleItemClick}>
              <LeftSideBarMenuItem
                title={item.title}
                icon={item.icon}
                customIcon={item.customIcon}
                iconSize={item.iconSize}
                path={item.path}
              />
            </div>
          );
        })}
        <PostCreateModal buttonText="게시하기" />
      </nav>

      <div className="flex justify-end">
        <SignOutButton />
      </div>
    </div>
  );
};

export default LeftSideBarMenuSection;
