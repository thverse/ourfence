import { PostResponse } from "shared";
import { TabBarItem } from "@/types/tabBarType";
import { useEffect } from "react";
import Post from "@/modules/post/components/Post";
import TabBar from "@/components/TabBar";
import { useTabBarStore } from "@/app/store";

interface PostListWithTabBarProps {
  tabs: TabBarItem[];
  initialActiveTab: string;
  postList: PostResponse[];
  isFetched?: boolean;
  emptyMessage?: string;
  classNameForTabBar?: string;
}

const PostListWithTabBar = ({
  tabs,
  initialActiveTab,
  postList,
  isFetched,
  emptyMessage = "게시물이 없습니다.",
  classNameForTabBar,
}: PostListWithTabBarProps) => {
  const { selectedTabId } = useTabBarStore();

  useEffect(() => {
    if (isFetched) {
      window.scrollTo(0, 0);
    }
  }, [isFetched, selectedTabId]);

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
