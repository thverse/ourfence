import { PostResponse } from "shared";
import { TabBarItem } from "@/types/tabBarType";
import Post from "@/modules/post/components/Post";
import TabBar from "@/components/TabBar";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useEffect } from "react";
import { useTabBarStore } from "@/app/store";
import { PostType } from "../types/post.type";
import { usePostListFromCurrentUser } from "../hooks/usePostList";

interface PostListWithTabBarProps {
  tabs: TabBarItem[];
  initialActiveTab: PostType;
  emptyMessage?: string;
  classNameForTabBar?: string;
}

const PostListWithTabBar = ({
  tabs,
  initialActiveTab,
  emptyMessage = "게시물이 없습니다.",
  classNameForTabBar,
}: PostListWithTabBarProps) => {
  const { selectedTabId } = useTabBarStore();

  const { data: postList, isFetched } = usePostListFromCurrentUser({
    type: selectedTabId
      ? (selectedTabId as PostType)
      : (initialActiveTab as PostType),
  });

  useScrollToTop([isFetched]);

  return (
    <div>
      <TabBar
        items={tabs}
        initialActiveTab={initialActiveTab}
        className={classNameForTabBar}
      />
      {postList?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {postList?.length === 0 && (
        <div className="flex items-center justify-center py-10 text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default PostListWithTabBar;
