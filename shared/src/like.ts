import { PostResponse } from "./post";

export type LikeResponse = {
  userId: number;
  postId: number;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type UnLikeResponse = LikeResponse;

export type LikeCountResponse = {
  count: number;
};

export type LikePostResponse = PostResponse & {
  isCurrentUserLiked: boolean;
};

export type UnLikePostResponse = LikePostResponse;
