import { useTopBarStore } from "@/app/store";
import Post from "../../post/components/Post";
import { useEffect } from "react";

const getPostList = (type: TopBarItemType) => {
  //탭 이동시 스크롤 위치는 맨위로 고정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);
  return type === "myPosts" ? (
    <>
      <Post />
      <Post />
      <Post />
    </>
  ) : (
    ""
  );
};

const Feed = () => {
  const { selectedTopBarItem } = useTopBarStore();
  const postList = getPostList(selectedTopBarItem);

  return <>{postList}</>;
};

export default Feed;
