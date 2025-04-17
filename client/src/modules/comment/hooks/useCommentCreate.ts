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
