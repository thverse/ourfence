import { PostResponse } from "shared";
import { TabBarItem } from "@/types/tabBarType";
import Post from "@/modules/post/components/Post";
import TabBar from "@/components/TabBar";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { PostType } from "../types/post.type";

interface PostListWithTabBarProps {
  tabs: TabBarItem[];
  initialActiveTab: PostType;
  emptyMessage?: string;
  classNameForTabBar?: string;
  postList: PostResponse[];
}

const PostListWithTabBar = ({
  tabs,
  initialActiveTab,
  emptyMessage = "게시물이 없습니다.",
  classNameForTabBar,
  postList,
}: PostListWithTabBarProps) => {
  useScrollToTop([postList]);

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
