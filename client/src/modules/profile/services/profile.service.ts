import { apiClient } from "@/lib/api";
import { UserProfileResponse } from "@ourfence/shared";
import { ProfileUpdatePayload } from "../types/profile.type";

export const profileService = {
  updateProfile: async (profileUpdatePayload: ProfileUpdatePayload) => {
    const response = await apiClient.post<UserProfileResponse>(
      "api/user/profile",
      profileUpdatePayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

export default profileService;
