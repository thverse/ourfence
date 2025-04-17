import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { commentService } from "../services/comment.service";
import { CommentUpdatePayload } from "../types/comment.type";

export const useCommentUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: CommentUpdatePayload) =>
      commentService.updateComment(comment),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", result.postId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
