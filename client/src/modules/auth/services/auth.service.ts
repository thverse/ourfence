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
  accessToken: string;
  refreshToken: string;
};

export const authService = {
  signIn: async (condition: SignInCondition) => {
    const response = await apiClient.post<AuthResponse>("/signin", condition);
    return response.data;
  },

  signUp: async (data: SignUpCondition) => {
    const response = await apiClient.post<AuthResponse>("/signup", data);
    return response.data;
  },

  //   getProfile: async () => {
  //     const response = await apiClient.get<User>('/auth/profile');
  //     return response.data;
  //   },

  logout: async () => {
    await apiClient.post("/auth/logout");
  },
};
