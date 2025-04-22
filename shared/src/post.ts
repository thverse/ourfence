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
export interface PostResponse {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  postImages: PostImage[];
  user: {
    id: number;
    username: string;
    email: string;
    userProfile: {
      nickname: string | null;
      profileImageUrl: string | null;
    } | null;
  };
  comments: {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }[];
  _count: {
    likes: number;
    comments: number;
  };
}
