import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { commentService } from "../services/comment.service";
import { toast } from "react-toastify";

export const useCommentDelete = (commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => commentService.deleteComment({ commentId }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", result.postId],
      });
      toast.success("댓글이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("댓글 삭제에 실패했습니다.");
    },
  });
};
