export type LikeResponse = {
  userId: number;
  postId: number;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type DeleteLikeResponse = {
  isSuccess: boolean;
};

export type likeCountResponse = {
  count: number;
};
