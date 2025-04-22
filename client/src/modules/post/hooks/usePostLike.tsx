import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/post.service";
import { toast } from "react-toastify";

export const usePostLike = (postId: number) => {
  const queryClient = useQueryClient();

  const updatePostCache = (isLiked: boolean) => {
    // 단일 포스트 캐시 업데이트
    queryClient.setQueryData(["post", postId], (oldPost: any) => {
      if (!oldPost) return oldPost;
      return {
        ...oldPost,
        isLiked,
        _count: {
          ...oldPost._count,
          likes: isLiked
            ? (oldPost._count?.likes || 0) + 1
            : Math.max((oldPost._count?.likes || 0) - 1, 0),
        },
      };
    });

    // 포스트 목록 캐시 업데이트
    queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
      if (!Array.isArray(oldData)) return oldData;
      return oldData.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked,
            _count: {
              ...post._count,
              likes: isLiked
                ? (post._count?.likes || 0) + 1
                : Math.max((post._count?.likes || 0) - 1, 0),
            },
          };
        }
        return post;
      });
    });
  };

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: () => {
      const post = queryClient.getQueryData<any>(["post", postId]);
      console.log(post);
      return post?.isCurrentUserLiked
        ? postService.unlikePost(postId)
        : postService.likePost({ postId });
    },
    onMutate: async () => {
      const post = queryClient.getQueryData<any>(["post", postId]);
      const isCurrentlyLiked = post?.isCurrentUserLiked || false;
      updatePostCache(!isCurrentlyLiked);
    },
    onError: (error) => {
      const post = queryClient.getQueryData<any>(["post", postId]);
      const isCurrentlyLiked = post?.isCurrentUserLiked || false;
      updatePostCache(isCurrentlyLiked);
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
    },
  });

  return {
    toggleLike,
    isPending,
  };
};
