import TabBar from "@/components/TabBar";
import React from "react";

const ProfilePage = () => {
  const profileTabs = [
    {
      id: "posts",
      label: "게시물",
    },
    {
      id: "likes",
      label: "좋아요",
    },
    {
      id: "comments",
      label: "댓글",
    },
  ];

  return (
    <div>
      <TabBar items={profileTabs} initialActiveTab="posts" />
    </div>
  );
};

export default ProfilePage;
