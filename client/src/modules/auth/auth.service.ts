import { apiClient } from "@/lib/api";

type SignInCondition = {
  username: string;
  password: string;
};

type SignUpCondition = {
  username: string;
  email: string;
  password: string;
};

type User = {
  id: number;
  username: string;
  email: string;
};
type AuthResponse = {
  user: User;
};

export const authService = {
  signIn: async function (condition: SignInCondition) {
    const response = await apiClient.post<AuthResponse>(
      "/api/signin",
      condition
    );
    return response.data;
  },

  signUp: async function (data: SignUpCondition) {
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
