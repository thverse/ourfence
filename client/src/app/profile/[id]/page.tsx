"use client";

import TabBar from "@/components/TabBar";
import React, { useEffect } from "react";
import { useTabBarStore } from "@/app/store";
import SectionHeader from "@/components/SectionHeader";
import Post from "@/modules/post/components/Post";
import ProfileEditDialog from "@/modules/profile/components/ProfileEditDialog";
import Feed from "@/modules/feed/components/Feed";
import { usePostList } from "@/modules/post/hooks/usePostList";
import { PostType } from "@/modules/post/types/post.type";
import { useUser } from "@/modules/user/hooks/useUser";

const ProfilePage = () => {
  const { selectedTabId, setSelectedTabId } = useTabBarStore();
  const { data: user } = useUser();

  useEffect(() => {
    setSelectedTabId("posts");
  }, [setSelectedTabId]);

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

  const getUserIds = () => {
    const userIds: number[] = [];
    if (selectedTabId === "myPosts") {
      if (user) {
        userIds.push(user.id);
      }
    } else if (selectedTabId === "followingsPosts") {
      if (user) {
        userIds.push(user.id);
      }
    }
    return userIds;
  };

  const { data: postList, isFetched } = usePostList({
    type: PostType.USER,
    userIds: getUserIds(),
  });

  //postList 가 조회되고 나서 스크롤 맨 위로 이동
  useEffect(() => {
    if (isFetched) {
      window.scrollTo(0, 0);
    }
  }, [isFetched]);

  return (
    <div>
      <div>
        <SectionHeader pageTitle="내 정보" />

        <div className="h-48 bg-gray-200"></div>

        <div className="px-4 pb-4">
          <div className="relative -mt-16 mb-3">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200"></div>
            <div className="absolute bottom-4 right-0">
              <ProfileEditDialog />
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">사용자 이름</h2>
              <p className="text-gray-500">@username</p>
              <p className="text-gray-500">
                안녕 나는 미래를 그릴줄 아는 사람이야.
              </p>
            </div>
          </div>

          <div className="flex gap-4 text-sm text-gray-500">
            <span>100 팔로잉</span>
            <span>200 팔로워</span>
          </div>
        </div>
      </div>

      <TabBar items={profileTabs} initialActiveTab="posts" />

      <div className="divide-y">
        {postList?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
