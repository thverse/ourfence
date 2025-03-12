import { apiClient } from "@/lib/api";

export const getUserProfile = async () => {
  const response = await apiClient.get("api/user/me");
  return response.data;
};
