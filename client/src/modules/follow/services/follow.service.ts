// src/modules/user/services/follow.service.ts
import { apiClient } from "@/lib/api";
import { FollowResponse } from "@ourfence/shared";

export const followService = {
  follow: async (targetUserId: string): Promise<FollowResponse> => {
    const response = await apiClient.post("/api/follow", { targetUserId });
    return response.data;
  },

  unfollow: async (targetUserId: string): Promise<FollowResponse> => {
    const response = await apiClient.delete(`/api/follow/${targetUserId}`);
    return response.data;
  },

  getFollowers: async (userId: string): Promise<FollowResponse[]> => {
    const response = await apiClient.get(`/api/follow/followers/${userId}`);
    return response.data;
  },

  getFollowings: async (userId: string): Promise<FollowResponse[]> => {
    const response = await apiClient.get(`/api/follow/following/${userId}`);
    return response.data;
  },
};
