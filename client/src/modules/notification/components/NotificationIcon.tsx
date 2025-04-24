// src/modules/notification/components/NotificationIcon.tsx
"use client";

import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface NotificationIconProps {
  size?: number;
}

export const NotificationIcon = ({ size }: NotificationIconProps) => {
  const unreadCount = 2;
  //   // 읽지 않은 알림 개수를 가져오는 쿼리
  //   const { data: unreadCount } = useQuery({
  //     queryKey: ["notifications", "unread-count"],
  //     queryFn: async () => {
  //       const response = await fetch("/api/notifications/unread-count");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch unread notifications count");
  //       }
  //       return response.json();
  //     },
  //     // 1분마다 갱신
  //     refetchInterval: 60000,
  //   });

  return (
    <div className="relative inline-flex items-center">
      <Bell size={size} />
      {unreadCount > 0 && (
        <div
          className={cn(
            "absolute -top-1.5 -left-1.5", // 위치 조정
            "min-w-[16px] h-4 px-1 rounded-full bg-red-500",
            "flex items-center justify-center",
            "text-[10px] font-bold text-white"
          )}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </div>
      )}
    </div>
  );
};
