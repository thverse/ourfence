"use client";

import SectionHeader from "@/components/SectionHeader";
import ProfileEditDialog from "@/modules/profile/components/ProfileEditDialog";
import { useUserProfile, useCurrentUser } from "@/modules/user/hooks/useUser";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { UserIcon, ImageIcon } from "lucide-react";
import { PostType } from "@/modules/post/types/post.type";
import PostListWithTabBar from "@/modules/post/components/PostListWithTabBar";
import FollowButton from "@/modules/follow/components/FollowButton";
import { usePostList } from "@/modules/post/hooks/usePostList";
import { useTabBarStore } from "@/app/store";
import { useEffect } from "react";

const ProfilePage = () => {
  const params = useParams();
  const userId = params.id as string;
  const { data: user } = useUserProfile({ userId });
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const userInfo = userId === currentUser?.id?.toString() ? currentUser : user;
  const { selectedTabId } = useTabBarStore();

  const { data: postList } = usePostList({
    type: selectedTabId as PostType,
    targetUserId: userInfo?.id.toString(),
    enabled: !!selectedTabId,
  });
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

  return (
    <div>
      <SectionHeader pageTitle={userInfo?.userProfile?.nickname ?? ""} />

      <div className="h-48 bg-gray-200">
        {userInfo?.userProfile?.coverImageUrl ? (
          <Image
            src={userInfo.userProfile.coverImageUrl}
            alt="cover"
            width={1500}
            height={500}
            className="w-full h-full object-cover"
            unoptimized
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
                unoptimized
                className="object-cover w-full h-full rounded-full border-white border-2"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-white border-2">
                <UserIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="absolute bottom-4 right-0">
            <div className="flex items-center gap-2">
              {currentUser?.id !== userInfo?.id && userInfo?.id && (
                <FollowButton
                  targetUserId={userInfo?.id.toString()}
                  isFollowing={userInfo?.isFollowing}
                />
              )}
              {currentUser?.id === userInfo?.id && (
                <div>{userInfo && <ProfileEditDialog user={userInfo} />}</div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {userInfo?.userProfile?.nickname}
            </h2>
            <p className="text-gray-500">@{userInfo?.username}</p>
            <p className="text-gray-500">{userInfo?.userProfile?.bio}</p>
          </div>
        </div>

        <div className="flex gap-4 text-sm text-gray-500">
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/follow/${userInfo?.id}`)}
          >
            <span className="font-bold text-black pr-1">
              {userInfo?._count.followings}
            </span>
            팔로잉
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/follow/${userInfo?.id}`)}
          >
            <span className="font-bold text-black pr-1">
              {userInfo?._count.followers}
            </span>
            팔로워
          </div>
        </div>
      </div>

      <PostListWithTabBar
        tabs={tabBarItems}
        initialActiveTab={PostType.ME}
        postList={postList ?? []}
      />
    </div>
  );
};

export default ProfilePage;
