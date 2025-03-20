import SectionHeader from "@/components/SectionHeader";
import NotificationItem from "@/modules/notifications/components/NotificationItem";
import React from "react";

export default function NotificationsPage() {
  return (
    <div>
      <div className="flex flex-col">
        <SectionHeader pageTitle="Notifications" />
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
