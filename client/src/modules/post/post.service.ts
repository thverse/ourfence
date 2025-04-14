import { apiClient } from "@/lib/api";
import { PostCreatePayload } from "./types/post";

export const createPost = async (postCreatePayload: PostCreatePayload) => {
  const response = await apiClient.post("api/post", postCreatePayload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
