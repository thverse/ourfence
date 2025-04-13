export type SearchUserResponse = {
  users: Array<{
    id: number;
    username: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    userProfile: {
      id: number;
      userId: number;
      nickname: string;
      profileImageUrl: string | null;
      coverImageUrl: string | null;
      bio: string | null;
      location: string | null;
      websiteUrl: string | null;
      createdAt: Date;
      updatedAt: Date | null;
      deletedAt: Date | null;
    } | null;
    _count: {
      followers: number;
      followings: number;
      posts: number;
    };
  }>;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type SearchPostResponse = {
  posts: Array<{
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    user: {
      id: number;
      username: string;
      userProfile: {
        id: number;
        userId: number;
        nickname: string;
        profileImageUrl: string | null;
        coverImageUrl: string | null;
        bio: string | null;
        location: string | null;
        websiteUrl: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
      } | null;
    };
    postImages: Array<{
      id: number;
      url: string;
      createdAt: Date;
      updatedAt: Date | null;
      deletedAt: Date | null;
    }>;
    _count: {
      likes: number;
      comments: number;
    };
  }>;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
