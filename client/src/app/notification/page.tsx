"use client";

import SectionHeader from "@/components/SectionHeader";
import NotificationItem from "@/modules/notification/components/NotificationItem";
import React, { useEffect } from "react";
import { useNotificationList } from "@/modules/notification/hooks/useNotificationList";
import { useCurrentUser } from "@/modules/user/hooks/useUser";
import { useRouter } from "next/navigation";

export default function NotificationPage() {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  // 로딩 중이거나 사용자가 없으면 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }

  const { data: notificationList } = useNotificationList({
    userId: user.id,
    enabled: !!user,
  });
  return (
    <div>
      <div className="flex flex-col">
        <SectionHeader pageTitle="알림" />
        {notificationList?.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
