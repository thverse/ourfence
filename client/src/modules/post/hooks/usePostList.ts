// hooks/usePostList.ts
import { useQuery } from "@tanstack/react-query";
import { postService } from "../post.service";
import { PostResponse } from "shared";
import { PostType } from "../types/post.type";

interface UsePostListProps {
  type: PostType;
  targetUserId?: string;
  enabled?: boolean;
}

export const usePostListFromCurrentUser = ({
  type,
  enabled = true,
}: UsePostListProps) => {
  return useQuery<PostResponse[]>({
    queryKey: ["postList", type],
    queryFn: () => {
      return postService.getPosts({
        type,
        cursor: "",
        limit: 10,
      });
    },
    enabled,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
};

export const usePostListFromUser = ({
  type,
  targetUserId,
  enabled = true,
}: UsePostListProps) => {
  return useQuery<PostResponse[]>({
    queryKey: ["postList", type, targetUserId],
    queryFn: () => {
      return postService.getPosts({
        type,
        cursor: "",
        limit: 10,
        targetUserId: targetUserId,
      });
    },
    enabled,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
};
