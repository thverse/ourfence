import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentService } from "../services/comment.service";
import {
  CommentCreatePayload,
  CommentUpdatePayload,
  CommentDeletePayload,
} from "../types/comment.type";
import { toast } from "react-toastify";

export const useCommentCreate = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createComment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (commentCreatePayload: CommentCreatePayload) => {
      return commentService.createComment(commentCreatePayload);
    },
    onSuccess: (_, commentCreatePayload) => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", commentCreatePayload.postId],
      });
      // 포스트 캐시 업데이트 (댓글 작성 시 댓글 수 증가)
      queryClient.setQueryData(
        ["post", commentCreatePayload.postId],
        (oldPost: any) => {
          if (!oldPost) return oldPost;
          return {
            ...oldPost,
            _count: {
              ...oldPost._count,
              comments: (oldPost._count?.comments || 0) + 1,
            },
          };
        }
      );

      // 포스트 목록 캐시 업데이트 (댓글 작성 시 댓글 수 증가)
      queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
        if (!Array.isArray(oldData)) return oldData;
        return oldData.map((post) => {
          if (post.id === commentCreatePayload.postId) {
            return {
              ...post,
              _count: {
                ...post._count,
                comments: (post._count?.comments || 0) + 1,
              },
            };
          }
          return post;
        });
      });
      toast.success("댓글이 작성되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("댓글 작성에 실패했습니다.");
    },
  });

  return {
    createComment,
    isPending,
    isSuccess,
  };
};
