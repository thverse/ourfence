import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/post.service";
import { toast } from "react-toastify";
import { PostType } from "../types/post.type";
import { PostResponse } from "@ourfence/shared";

export const usePostLike = (post: PostResponse) => {
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: () => {
      return post?.isCurrentUserLiked
        ? postService.unlikePost(post.id)
        : postService.likePost({ postId: post.id });
    },

    // 낙관적 업데이트 처리
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post", post.id] });

      const previousPost = queryClient.getQueryData<PostResponse>([
        "post",
        post.id,
      ]);

      // 낙관적 업데이트
      queryClient.setQueryData<PostResponse>(["post", post.id], (old) => {
        if (!old) return old;
        return {
          ...old,
          isCurrentUserLiked: !old.isCurrentUserLiked,
          likeCount: old.isCurrentUserLiked
            ? old._count.likes - 1
            : old._count.likes + 1,
        };
      });

      return { previousPost };
    },

    onError: (_err, _variables, context) => {
      // 롤백 처리
      if (context?.previousPost) {
        queryClient.setQueryData(["post", post.id], context.previousPost);
      }
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
    },

    onSettled: () => {
      // 서버 응답 후, 데이터를 새로고침하여 정확하게 반영
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
  });

  return {
    toggleLike,
    isPending,
  };
};
