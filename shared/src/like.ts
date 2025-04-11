export type LikeResponse = {
  userId: number;
  postId: number;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type DeleteLikeResponse = LikeResponse;

export type likeCountResponse = {
  count: number;
};
