import { apiClient } from "@/lib/api";
import { CommentResponse } from "@ourfence/shared";
import {
  CommentCreatePayload,
  CommentUpdatePayload,
  CommentDeletePayload,
} from "../types/comment.type";

export const commentService = {
  createComment: async (comment: CommentCreatePayload) => {
    const response = await apiClient.post<CommentResponse>(
      "/api/comment",
      comment
    );
    return response.data;
  },

  updateComment: async (comment: CommentUpdatePayload) => {
    const response = await apiClient.patch<CommentResponse>(
      `/api/comment/${comment.commentId}`,
      comment
    );
    return response.data;
  },

  deleteComment: async (comment: CommentDeletePayload) => {
    const params = new URLSearchParams({
      commentId: comment.commentId.toString(),
    });
    const response = await apiClient.delete<CommentResponse>(
      `/api/comment?${params.toString()}`
    );
    return response.data;
  },

  getCommentList: async (postId: number) => {
    const params = new URLSearchParams({
      postId: postId.toString(),
      cursor: "",
      limit: "10",
    });

    const response = await apiClient.get<CommentResponse[]>(
      `/api/comment?${params.toString()}`
    );
    return response.data;
  },
};
