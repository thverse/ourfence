// hooks/usePostList.ts
import { useQuery } from "@tanstack/react-query";
import { postService } from "../post.service";
import { PostResponse } from "shared";
import { PostType } from "../types/post.type";

interface UsePostListProps {
  type: PostType;
  enabled?: boolean;
}

export const usePostList = ({ type, enabled = true }: UsePostListProps) => {
  return useQuery<PostResponse[]>({
    queryKey: ["postList", type],
    queryFn: () =>
      postService.getPosts({
        type,
        cursor: "",
        limit: 10,
      }),
    enabled,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
};
