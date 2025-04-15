// hooks/usePostList.ts
import { useQuery } from "@tanstack/react-query";
import { postService } from "../post.service";
import { PostResponse } from "shared";
import { PostType } from "../types/post";

interface UsePostListProps {
  type: PostType;
  userIds: number[];
  enabled?: boolean;
}

export const usePostList = ({
  type,
  userIds,
  enabled = true,
}: UsePostListProps) => {
  return useQuery<PostResponse[]>({
    queryKey: ["postList", type, userIds],
    queryFn: () =>
      postService.getPosts({
        type,
        userIds,
        cursor: "",
        limit: 10,
      }),
    enabled,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
};
