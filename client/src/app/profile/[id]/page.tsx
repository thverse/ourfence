"use client";

import { useTabBarStore } from "@/app/store";
import SectionHeader from "@/components/SectionHeader";
import ProfileEditDialog from "@/modules/profile/components/ProfileEditDialog";
import { usePostListFromUser } from "@/modules/post/hooks/usePostList";
import { useUserProfile } from "@/modules/user/hooks/useUser";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UserIcon, ImageIcon } from "lucide-react";
import { PostType } from "@/modules/post/types/post.type";
import PostListWithTabBar from "@/modules/post/components/PostListWithTabBar";
import { useEffect } from "react";

const ProfilePage = () => {
  const params = useParams();
  const userId = params.id as string;
  const { selectedTabId } = useTabBarStore();
  const { data: user } = useUserProfile({ userId });

  const tabBarItems = [
    {
      id: PostType.ME,
      label: "게시물",
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

  const { data: postList, isFetched } = usePostListFromUser({
    type: selectedTabId as PostType,
    targetUserId: userId,
  });

  return (
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
            <h2 className="text-xl font-bold">{user?.userProfile?.nickname}</h2>
            <p className="text-gray-500">@{user?.username}</p>
            <p className="text-gray-500">{user?.userProfile?.bio}</p>
          </div>
        </div>

        <div className="flex gap-4 text-sm text-gray-500">
          <span>100 팔로잉</span>
          <span>200 팔로워</span>
        </div>
      </div>

      <PostListWithTabBar
        tabs={tabBarItems}
        initialActiveTab={PostType.ME}
        postList={postList}
        triggers={[selectedTabId, isFetched]}
        emptyMessage="게시물이 없습니다."
      />
    </div>
  );
};

export default ProfilePage;
