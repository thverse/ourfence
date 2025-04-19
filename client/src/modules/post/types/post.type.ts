export enum PostType {
  ME = "me",
  LIKE = "like",
  FOLLOW = "follow",
  COMMENT = "comment",
}

export type PostCreatePayload = FormData;

export type PostImageSize = {
  width: number;
  height: number;
};

export type GetPostListPayload = {
  type: PostType;
  cursor: string;
  limit: number;
};
