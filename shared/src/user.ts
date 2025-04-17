export interface UserResponse {
  id: number;
  username: string;
  email: string;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface UserWithProfileResponse {
  id: number;
  username: string;
  email: string;
  refreshToken?: string | null;
  userProfile: {
    id: number;
    profileImageUrl: string | null;
  } | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
