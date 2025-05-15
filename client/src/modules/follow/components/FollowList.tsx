"use client";

import {
  useFollowerList,
  useFollowingList,
} from "@/modules/follow/hooks/useFollowList";
import { useTabBarStore } from "@/app/store";
import { FollowUserItem } from "./FollowUserItem";

interface FollowListProps {
  userId: string;
  emptyMessageTitle?: string;
  emptyMessageDescription?: string;
}

export const FollowList = ({
  userId,
  emptyMessageTitle,
  emptyMessageDescription,
}: FollowListProps) => {
  const { selectedTabId } = useTabBarStore();
  const { data: userList, isLoading } =
    selectedTabId === "followers"
      ? useFollowerList(userId)
      : useFollowingList(userId);

  //   if (isLoading) {
  //     return <LoadingSpinner />;
  //   }

  if (!userList?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <h3 className="font-bold text-xl mb-2">{emptyMessageTitle}</h3>
        <p className="text-muted-foreground text-sm">
          {emptyMessageDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {userList.map((user) => {
        const userId =
          selectedTabId === "followers" ? user.followingId : user.followerId;
        return <FollowUserItem key={userId} userId={userId.toString()} />;
      })}
    </div>
  );
};
