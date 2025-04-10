export type CommentResponse = {
  id: number;
  userId: number;
  postId: number;
  parentId: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type CommentsResponse = CommentResponse[];
