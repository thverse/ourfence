import { apiClient } from "@/lib/api";

export const getUserProfile = async (userId: string) => {
  const response = await apiClient.get("api/user/profile", {
    params: {
      userId,
    },
  });
  return response.data;
};
