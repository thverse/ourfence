export type FollowResponse = {
  followerId: number;
  followingId: number;
  created_at: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type FollowersResponse = FollowResponse[];

export type FollowingsResponse = FollowResponse[];

export type UnfollowResponse = {
  isSuccess: boolean;
};

export type FollowersCountResponse = {
  count: number;
};

export type FollowingCountResponse = {
  count: number;
};
