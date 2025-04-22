import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postService } from "../services/post.service";

export const usePostDelete = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postService.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postList"],
      });
      toast.success("게시물이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("게시물 삭제에 실패했습니다.");
    },
  });
};
