"use client";

import { useTabBarStore } from "@/app/store";
import { usePostListFromCurrentUser } from "../../post/hooks/usePostList";
import { PostType } from "../../post/types/post.type";
import PostListWithTabBar from "@/modules/post/components/PostListWithTabBar";

const Feed = () => {
  const tabBarItems = [
    { id: PostType.RECOMMEND, label: "추천" },
    { id: PostType.FOLLOW, label: "팔로잉" },
  ];

  return (
    <PostListWithTabBar
      tabs={tabBarItems}
      initialActiveTab={PostType.RECOMMEND}
      emptyMessage="게시물이 없습니다."
      classNameForTabBar="top-0 sticky"
    />
  );
};

export default Feed;
