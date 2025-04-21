"use client";

import { useTabBarStore } from "@/app/store";
import Post from "../../post/components/Post";
import { useEffect, useLayoutEffect } from "react";
import TabBar from "@/components/TabBar";
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

  //postList 가 조회되고 나서 스크롤 맨 위로 이동
  //탭 변경시 스크롤 맨 위로 이동
  useEffect(() => {
    if (isFetched) {
      window.scrollTo(0, 0);
    }
  }, [isFetched, selectedTabId]);

  return (
    <PostListWithTabBar
      tabs={tabBarItems}
      initialActiveTab={PostType.RECOMMEND}
      postList={postList}
      isFetched={isFetched}
      emptyMessage="게시물이 없습니다."
      classNameForTabBar="top-0 sticky"
    />
  );
};

export default Feed;
