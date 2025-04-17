export type CommentMutationResponse = {
  id: number;
  userId: number;
  postId: number;
  parentId: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export interface CommentResponse {
  id: number;
  userId: number;
  postId: number;
  parentId: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  user: {
    id: number;
    username: string;
    email: string;
    userProfile: {
      id: number;
      profileImageUrl: string | null;
    } | null;
  };
  _count?: {
    replies?: number;
  };
}
