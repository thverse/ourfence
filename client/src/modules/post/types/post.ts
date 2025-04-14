export type PostCreatePayload = {
  content: string;
  image: File | null;
};

export type PostImageSize = {
  width: number;
  height: number;
};
