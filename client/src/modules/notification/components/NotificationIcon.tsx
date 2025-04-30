// src/modules/notification/components/NotificationIcon.tsx
"use client";

import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useNotificationUnreadCount } from "../hooks/useNotificationUnreadCount";
interface NotificationIconProps {
  size?: number;
  userId?: number;
}

export const NotificationIcon = ({ size, userId }: NotificationIconProps) => {
  const { data: unreadCount } = useNotificationUnreadCount({
    userId,
  });
  return (
    <div className="relative inline-flex items-center">
      <Bell size={size} />
      {unreadCount && unreadCount.count > 0 && (
        <div
          className={cn(
            "absolute -top-1.5 -left-1.5", // 위치 조정
            "min-w-[16px] h-4 px-1 rounded-full bg-red-500",
            "flex items-center justify-center",
            "text-[10px] font-bold text-white"
          )}
        >
          {unreadCount.count > 99 ? "99+" : unreadCount.count}
        </div>
      )}
    </div>
  );
};
