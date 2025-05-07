import { PostResponse } from "@ourfence/shared";
import { TabBarItem } from "@/types/tabBarType";
import Post from "@/modules/post/components/Post";
import TabBar from "@/components/TabBar";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { PostType } from "../types/post.type";
import EmptyStateGuide from "@/components/EmptyStateGuide";
interface PostListWithTabBarProps {
  tabs: TabBarItem[];
  initialActiveTab: PostType;
  classNameForTabBar?: string;
  postList: PostResponse[];
}

const PostListWithTabBar = ({
  tabs,
  initialActiveTab,
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
      {postList?.length > 0 ? (
        postList?.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <EmptyStateGuide message="게시물이 없습니다." />
      )}
    </div>
  );
};

export default PostListWithTabBar;
