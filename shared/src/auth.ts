export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface AuthRefreshResponse {
  success: boolean;
  message: string;
}
