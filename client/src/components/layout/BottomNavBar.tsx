"use client";

import { Home, Bell, UserCheck, Pencil, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/modules/user/hooks/useUser";
import { NotificationIcon } from "@/modules/notification/components/NotificationIcon";
import PostCreateModal from "@/modules/post/components/PostCreateModal";
import { useSignOut } from "@/modules/auth/hooks/useAuth";

const BottomNavBar = () => {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const { mutate: signOut } = useSignOut();

  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  const menuItems = [
    {
      title: "홈",
      icon: Home,
      path: "/",
      iconSize: 24,
    },
    {
      title: "알림",
      customIcon: <NotificationIcon size={24} userId={user?.id} />,
      path: "/notification",
    },
    {
      title: "내 정보",
      icon: UserCheck,
      path: `/profile/${user?.id}`,
      iconSize: 24,
    },
    {
      title: "로그아웃",
      icon: LogOut,
      path: "",
      iconSize: 24,
      onClick: () => signOut(),
      className: "text-gray-500",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200/30 bg-white/40 backdrop-blur-xl">
      <div className="relative">
        <div className="absolute -top-14 right-4">
          <PostCreateModal buttonText="" />
        </div>
        <div className="flex justify-around items-center h-16 px-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
                item.className ||
                (isActive(item.path) ? "text-black" : "text-gray-500")
              }`}
              onClick={item.onClick}
            >
              {item.customIcon || (item.icon && <item.icon size={22} />)}
              <span className="text-[10px]">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
