// hooks/usePostList.ts
import { useQuery } from "@tanstack/react-query";
import { postService } from "../services/post.service";
import { PostResponse } from "shared";
import { PostType } from "../types/post.type";

interface UsePostListProps {
  type: PostType;
  targetUserId?: string;
  enabled?: boolean;
}

export const usePostList = ({
  type,
  targetUserId,
  enabled = true,
}: UsePostListProps) => {
  return useQuery<PostResponse[]>({
    queryKey: ["postList", "user", type, targetUserId],
    queryFn: () => {
      return postService.getPostList({
        type,
        cursor: "",
        limit: 10,
        targetUserId,
      });
    },
    enabled,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
};
