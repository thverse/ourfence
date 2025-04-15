export type PostCreatePayload = FormData;

export type PostImageSize = {
  width: number;
  height: number;
};

export enum PostType {
  ALL = "ALL",
  USER = "USER",
}

export type GetPostListPayload = {
  userIds: number[];
  type: PostType;
  cursor: string;
  limit: number;
};
