import { useQuery } from "@tanstack/react-query";
import { CommentResponse } from "@ourfence/shared";
import { commentService } from "../services/comment.service";

export const useGetCommentList = (postId: number) => {
  return useQuery({
    queryKey: ["commentList", postId],
    queryFn: () => commentService.getCommentList(postId),
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
    enabled: !!postId,
  });
};
