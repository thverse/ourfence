import { apiClient } from "@/lib/api";
import { GetPostListPayload, PostCreatePayload } from "./types/post";
import { PostResponse } from "shared";

export const postService = {
  createPost: async (
    postCreatePayload: PostCreatePayload
  ): Promise<PostResponse> => {
    const response = await apiClient.post("api/post", postCreatePayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getPosts: async (
    getPostListPayload: GetPostListPayload
  ): Promise<PostResponse[]> => {
    const response = await apiClient.post<PostResponse[]>(
      "api/post/post_list",
      getPostListPayload
    );
    return response.data;
  },
};
