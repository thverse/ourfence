"use client";

import SectionHeader from "@/components/SectionHeader";
import NotificationItem from "@/modules/notification/components/NotificationItem";
import React, { useEffect } from "react";
import { useNotificationList } from "@/modules/notification/hooks/useNotificationList";
import { useCurrentUser } from "@/modules/user/hooks/useUser";
import { useRouter } from "next/navigation";
import EmptyStateGuide from "@/components/EmptyStateGuide";

export default function NotificationPage() {
  const { data: user } = useCurrentUser();

  const { data: notificationList } = useNotificationList({
    userId: user?.id,
    enabled: !!user,
  });

  return (
    <div>
      <div className="flex flex-col">
        <SectionHeader pageTitle="알림" />
        {notificationList && notificationList.length > 0 ? (
          notificationList?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <EmptyStateGuide message="알림이 없습니다." />
        )}
      </div>
    </div>
  );
}
