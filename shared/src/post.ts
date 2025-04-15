export interface PostImage {
  id: number;
  postId: number;
  url: string;
  type: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface PostResponse {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  postImages?: PostImage[];
  _count?: {
    likes: number;
    comments: number;
  };
  user?: {
    id: number;
    username: string;
    email: string;
    userProfile: {
      id: number;
      profileImage: string;
    };
  };
}
