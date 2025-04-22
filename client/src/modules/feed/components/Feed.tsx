"use client";

import { useTabBarStore } from "@/app/store";
import { usePostListFromCurrentUser } from "../../post/hooks/usePostList";
import { PostType } from "../../post/types/post.type";
import PostListWithTabBar from "@/modules/post/components/PostListWithTabBar";

const Feed = () => {
  const { selectedTabId } = useTabBarStore();

  const tabBarItems = [
    { id: PostType.RECOMMEND, label: "추천" },
    { id: PostType.FOLLOW, label: "팔로잉" },
  ];

  const { data: postList, isFetched } = usePostListFromCurrentUser({
    type: selectedTabId as PostType,
  });

  return (
    <PostListWithTabBar
      tabs={tabBarItems}
      initialActiveTab={PostType.RECOMMEND}
      postList={postList}
      triggers={[selectedTabId, isFetched]}
      emptyMessage="게시물이 없습니다."
      classNameForTabBar="top-0 sticky"
    />
  );
};

export default Feed;
