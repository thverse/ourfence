import { apiClient } from "@/lib/api";

export const commentService = {
  getComments: async (postId: string) => {
    const response = await apiClient.get(`/comments/${postId}`);
    return response.data;
  },
};
