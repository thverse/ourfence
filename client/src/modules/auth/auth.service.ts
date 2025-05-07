import { apiClient } from "@/lib/api";
import { SignInPayload, SignUpPayload } from "./types/auth.type";
import { AuthResponse } from "@ourfence/shared";

export const authService = {
  signIn: async function (condition: SignInPayload) {
    const response = await apiClient.post<AuthResponse>(
      "/api/signin",
      condition
    );
    return response.data;
  },

  signUp: async function (data: SignUpPayload) {
    const response = await apiClient.post<AuthResponse>("/api/signup", data);
    return response.data;
  },

  signOut: async function () {
    const response = await apiClient.post<AuthResponse>("/api/signout");
    return response.data;
  },

  refreshtokenValidate: async function () {
    const response = await apiClient.post<AuthResponse>("/api/refreshtoken");
    return response.data;
  },

  //   getProfile: async () => {
  //     const response = await apiClient.get<User>('/auth/profile');
  //     return response.data;
  //   },
};
