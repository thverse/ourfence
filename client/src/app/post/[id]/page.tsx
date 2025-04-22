"use client";

import { useParams, useRouter } from "next/navigation";
import { usePost } from "@/modules/post/hooks/usePost";
import Post from "@/modules/post/components/Post";

const PostDetailPage = () => {
  const params = useParams();
  const postId = Number(params.id);
  const router = useRouter();
  const { data: post, isLoading } = usePost({ postId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return <Post post={post} isDetail={true} onBack={() => router.back()} />;
};

export default PostDetailPage;
