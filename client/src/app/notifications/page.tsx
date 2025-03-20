import NotificationItem from "@/modules/notifications/components/NotificationItem";
import React from "react";

export default function NotificationsPage() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold p-4 border-b-gray-200 border-b sticky top-0 bg-white bg-opacity-90 z-10">
          Notifications
        </div>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </div>
  );
}
