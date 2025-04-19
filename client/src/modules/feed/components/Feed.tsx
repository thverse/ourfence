"use client";

import { useTabBarStore } from "@/app/store";
import Post from "../../post/components/Post";
import { useEffect, useLayoutEffect } from "react";
import TabBar from "@/components/TabBar";
import { usePostList } from "../../post/hooks/usePostList";
import { useUser } from "@/modules/user/hooks/useUser";
import { PostType } from "../../post/types/post.type";

const Feed = () => {
  const { selectedTabId } = useTabBarStore();
  const tabBarItems = [
    { id: PostType.RECOMMEND, label: "추천" },
    { id: PostType.FOLLOW, label: "팔로잉" },
  ];

  const { data: postList, isFetched } = usePostList({
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
    <div>
      <TabBar
        items={tabBarItems}
        initialActiveTab={tabBarItems[0].id}
        className="top-0 sticky"
      />
      <div className="flex flex-col gap-4">
        <div>
          {postList?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
