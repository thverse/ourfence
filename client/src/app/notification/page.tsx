import SectionHeader from "@/components/SectionHeader";
import NotificationItem from "@/modules/notification/components/NotificationItem";
import React from "react";

export default function NotificationPage() {
  return (
    <div>
      <div className="flex flex-col">
        <SectionHeader pageTitle="알림" />
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
