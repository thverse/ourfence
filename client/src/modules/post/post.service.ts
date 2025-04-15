import { apiClient } from "@/lib/api";
import { PostCreatePayload } from "./types/post";

export const postService = {
  createPost: async (postCreateFormData: FormData) => {
    const response = await apiClient.post("api/post", postCreateFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
