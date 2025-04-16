export interface PostImage {
  id: number;
  postId: number;
  url: string;
  type: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface PostMutationResponse {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  postImages?: PostImage[];
  user?: {
    id: number;
    username: string;
    email: string;
    userProfile: {
      id: number;
      profileImageUrl: string;
    };
  };
}
export interface PostListResponse {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  postImages: {
    id: number;
    url: string;
    type: string;
    postId: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
  user: {
    id: number;
    username: string;
    email: string;
    userProfile: {
      id: number;
      profileImageUrl: string | null;
    } | null;
  };
  _count: {
    likes: number;
    comments: number;
  };
}
