// hooks/usePostCreate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPost } from "../post.service";
import { PostCreatePayload } from "../types/post";

export const usePostCreate = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (postCreatePayload: PostCreatePayload) =>
      createPost(postCreatePayload),
    onSuccess: (data) => {
      // 캐시된 게시물 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // 성공 메시지 표시
      toast.success("게시물이 작성되었습니다.");
    },
    onError: (error: Error) => {
      // 에러 메시지 표시
      toast.error("게시물 작성에 실패했습니다.");
    },
  });

  return {
    createPost: mutate,
    isLoading: isPending,
  };
};
