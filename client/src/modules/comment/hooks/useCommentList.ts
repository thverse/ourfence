import { useQuery } from "@tanstack/react-query";
import { CommentResponse } from "shared";
import { commentService } from "../services/comment.service";

interface UseCommentListProps {
  postId: string;
}

export const useCommentList = ({ postId }: UseCommentListProps) => {
  return useQuery<CommentResponse[]>({
    queryKey: ["commentList", postId],
    queryFn: () => commentService.getComments(postId),
    enabled: !!postId,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
};
