import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/post.service";
import { toast } from "react-toastify";
import { PostType } from "../types/post.type";
import { cpSync } from "fs";
import { PostResponse } from "shared";

export const usePostLike = (post: PostResponse) => {
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: () => {
      return post?.isCurrentUserLiked
        ? postService.unlikePost(post.id)
        : postService.likePost({ postId: post.id });
    },
    onSuccess: () => {
      // 모든 관련 포스트 목록 무효화
      const postTypes = Object.values(PostType);
      postTypes.forEach((type) => {
        queryClient.invalidateQueries({
          queryKey: ["postList", "user", type],
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["post", post.id],
      });
    },
    onError: (error) => {
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
    },
  });

  return {
    toggleLike,
    isPending,
  };
};
