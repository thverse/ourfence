import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { commentService } from "../services/comment.service";
import { toast } from "react-toastify";
import { PostType } from "@/modules/post/types/post.type";
export const useCommentDelete = (commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => commentService.deleteComment({ commentId }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", result.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["postList", "user", "comment"],
      });

      // 포스트 캐시 업데이트 (댓글 삭제 시 댓글 수 감소)
      queryClient.setQueryData(["post", result.postId], (oldPost: any) => {
        if (!oldPost) return oldPost;
        return {
          ...oldPost,
          _count: {
            ...oldPost._count,
            comments: Math.max((oldPost._count?.comments || 0) - 1, 0),
          },
        };
      });

      // 포스트 목록 캐시 업데이트 (댓글 삭제 시 댓글 수 감소)
      queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
        if (!Array.isArray(oldData)) return oldData;
        return oldData.map((post) => {
          if (post.id === result.postId) {
            return {
              ...post,
              _count: {
                ...post._count,
                comments: Math.max((post._count?.comments || 0) - 1, 0),
              },
            };
          }
          return post;
        });
      });

      toast.success("댓글이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("댓글 삭제에 실패했습니다.");
    },
  });
};
