"use client";

import { usePostList } from "@/modules/post/hooks/usePostList";
import { PostType } from "../../post/types/post.type";
import PostListWithTabBar from "@/modules/post/components/PostListWithTabBar";
import { useTabBarStore } from "@/app/store";

const Feed = () => {
  const tabBarItems = [
    { id: PostType.RECOMMEND, label: "추천" },
    { id: PostType.FOLLOW, label: "팔로잉" },
  ];

  const { selectedTabId } = useTabBarStore();

  const { data: postList } = usePostList({
    type: selectedTabId as PostType,
    enabled: !!selectedTabId,
  });

  return (
    <PostListWithTabBar
      tabs={tabBarItems}
      initialActiveTab={PostType.RECOMMEND}
      classNameForTabBar="top-0 sticky"
      postList={postList ?? []}
    />
  );
};

export default Feed;
