import { PostResponse } from "shared";
import { TabBarItem } from "@/types/tabBarType";
import { useEffect } from "react";
import Post from "@/modules/post/components/Post";
import TabBar from "@/components/TabBar";
import { useTabBarStore } from "@/app/store";

interface TabPostListProps {
  tabs: TabBarItem[];
  initialActiveTab: string;
  postList?: PostResponse[];
  isFetched?: boolean;
  emptyMessage?: string;
  className?: string;
}

const TabPostList = ({
  tabs,
  initialActiveTab,
  postList,
  isFetched,
  emptyMessage = "게시물이 없습니다.",
  className,
}: TabPostListProps) => {
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
        className={className}
      />
      <div className="min-h-[500px]">
        <div className="divide-y">
          {postList?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          {postList?.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-500">
              {emptyMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabPostList;
