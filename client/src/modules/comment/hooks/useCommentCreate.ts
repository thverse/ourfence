import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentService } from "../services/comment.service";
import {
  CommentCreatePayload,
  CommentUpdatePayload,
  CommentDeletePayload,
} from "../types/comment.type";

export const useCommentCreate = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createComment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (commentCreatePayload: CommentCreatePayload) => {
      return commentService.createComment(commentCreatePayload);
    },
    onSuccess: (_, commentCreatePayload) => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", commentCreatePayload.postId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    createComment,
    isPending,
    isSuccess,
  };
};

export const useCommentUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: CommentUpdatePayload) =>
      commentService.updateComment(comment),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", result.postId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useCommentDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: CommentDeletePayload) =>
      commentService.deleteComment(comment),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", result.postId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetCommentList = (postId: number) => {
  return useQuery({
    queryKey: ["commentList", postId],
    queryFn: () => commentService.getCommentList(postId),
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
    enabled: !!postId,
  });
};
