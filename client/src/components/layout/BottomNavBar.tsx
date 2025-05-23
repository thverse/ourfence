"use client";

import { Home, Bell, UserCheck, Pencil, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/modules/user/hooks/useUser";
import { NotificationIcon } from "@/modules/notification/components/NotificationIcon";
import PostCreateModal from "@/modules/post/components/PostCreateModal";
import { useSignOut } from "@/modules/auth/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";

const BottomNavBar = () => {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const { mutate: signOut, isPending } = useSignOut();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isOpen]);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

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
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200/30 bg-white/40 backdrop-blur-xl">
      <div className="relative">
        <div className="absolute -top-16 right-5">
          <PostCreateModal buttonText="" />
        </div>
        <div className="flex justify-around items-center h-16 px-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
                isActive(item.path) ? "text-black" : "text-gray-500"
              }`}
            >
              {item.customIcon ||
                (item.icon && <item.icon size={item.iconSize} />)}
              <span className="text-[10px]">{item.title}</span>
            </Link>
          ))}
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <button
                className="flex-1 flex flex-col items-center justify-center gap-0.5 text-gray-500"
                disabled={isPending}
              >
                <LogOut size={24} />
                <span className="text-[10px]">로그아웃</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription className="sr-only">
                  로그아웃하면 다시 로그인해야 합니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isPending}
                >
                  로그아웃
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
