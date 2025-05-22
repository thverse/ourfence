// hooks/usePostCreate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/post.service";
import { toast } from "react-toastify";

interface CreatePostParams {
  content: string;
  image?: File;
}

interface UsePostCreateOptions {
  onSuccess?: () => void;
}

export const usePostCreate = (options?: UsePostCreateOptions) => {
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending: isLoading } = useMutation({
    mutationFn: (params: CreatePostParams) => {
      const formData = new FormData();
      formData.append("content", params.content);
      if (params.image) {
        formData.append("files", params.image);
      }
      return postService.createPost(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
      toast.success("게시물이 작성되었습니다.");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error("게시물 작성에 실패했습니다.");
    },
  });

  return {
    createPost,
    isLoading,
  };
};
