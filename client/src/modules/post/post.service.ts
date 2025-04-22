import { apiClient } from "@/lib/api";
import { GetPostListPayload, PostCreatePayload } from "./types/post.type";
import { PostMutationResponse, PostResponse } from "shared";

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

  getPost: async (postId: number) => {
    const response = await apiClient.get(`/api/post/${postId}`);
    return response.data;
  },

  deletePost: async (postId: number): Promise<PostMutationResponse> => {
    const response = await apiClient.delete(`api/post/${postId}`);
    return response.data;
  },
};
