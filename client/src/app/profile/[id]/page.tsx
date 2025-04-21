"use client";

import TabBar from "@/components/TabBar";
import React, { useEffect } from "react";
import { useTabBarStore } from "@/app/store";
import SectionHeader from "@/components/SectionHeader";
import Post from "@/modules/post/components/Post";
import ProfileEditDialog from "@/modules/profile/components/ProfileEditDialog";
import Feed from "@/modules/feed/components/Feed";
import { usePostList } from "@/modules/post/hooks/usePostList";
import { useUserProfile } from "@/modules/user/hooks/useUser";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UserIcon, ImageIcon } from "lucide-react";
import { PostType } from "@/modules/post/types/post.type";

const ProfilePage = () => {
  const params = useParams();
  const userId = params.id as string;
  const { selectedTabId } = useTabBarStore();
  const { data: user } = useUserProfile({ userId });

  const profileTabs = [
    {
      id: PostType.ME,
      label: "내 게시물",
    },
    {
      id: PostType.LIKE,
      label: "좋아요",
    },
    {
      id: PostType.COMMENT,
      label: "댓글",
    },
  ];

  const { data: postList, isFetched } = usePostList({
    type: selectedTabId as PostType,
  });

  //postList 가 조회된후 또는 탭 변경시 스크롤 맨 위로 이동
  useEffect(() => {
    if (isFetched) {
      window.scrollTo(0, 0);
    }
  }, [isFetched, selectedTabId]);

  return (
    <div>
      <div>
        <SectionHeader pageTitle="내 정보" />

        <div className="h-48 bg-gray-200">
          {user?.userProfile?.coverImageUrl ? (
            <Image
              src={user.userProfile.coverImageUrl}
              alt="cover"
              width={1500}
              height={500}
              className="w-full h-full object-cover"
              priority // 빠른 로딩을 위해 추가
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        <div className="px-4 pb-4">
          <div className="relative -mt-16 mb-3">
            <div className="relative w-32 h-32">
              {user?.userProfile?.profileImageUrl ? (
                <Image
                  src={user.userProfile.profileImageUrl}
                  alt="profile"
                  width={400}
                  height={400}
                  priority
                  className="object-cover w-full h-full rounded-full border-white border-2"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-white border-2">
                  <UserIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute bottom-4 right-0">
              {user && <ProfileEditDialog user={user} />}
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {user?.userProfile?.nickname}
              </h2>
              <p className="text-gray-500">@{user?.username}</p>
              <p className="text-gray-500">{user?.userProfile?.bio}</p>
            </div>
          </div>

          <div className="flex gap-4 text-sm text-gray-500">
            <span>100 팔로잉</span>
            <span>200 팔로워</span>
          </div>
        </div>
      </div>

      <TabBar items={profileTabs} initialActiveTab={PostType.ME} />
      {/* 고정 높이 컨테이너 추가 */}
      <div className="min-h-[500px]">
        {" "}
        <div className="divide-y">
          {postList?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          {/* 데이터가 없을 때 표시할 내용 */}
          {postList?.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-500">
              게시물이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
