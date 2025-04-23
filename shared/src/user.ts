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
    nickname: string | null;
    bio: string | null;
    profileImageUrl: string | null;
    coverImageUrl: string | null;
    location: string | null;
    websiteUrl: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  } | null;
  _count: {
    followers: number;
    followings: number;
  };
  isFollowing: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface UserProfileResponse {
  id: number;
  nickname: string | null;
  profileImageUrl: string | null;
  coverImageUrl: string | null;
  bio: string | null;
  location: string | null;
  websiteUrl: string | null;
  _count: {
    followers: number;
    followings: number;
  };
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface UserProfileUpdateResponse {
  id: number;
  nickname: string | null;
  profileImageUrl: string | null;
  coverImageUrl: string | null;
  bio: string | null;
  location: string | null;
  websiteUrl: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
