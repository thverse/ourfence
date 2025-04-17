export type CommentCreatePayload = {
  postId: number;
  content: string;
};

export type CommentUpdatePayload = {
  commentId: number;
  content: string;
};

export type CommentDeletePayload = {
  commentId: number;
};
