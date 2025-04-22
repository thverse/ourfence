import { apiClient } from "@/lib/api";
import {
  GetPostListPayload,
  PostCreatePayload,
  PostLikePayload,
} from "../types/post.type";
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

  getPostList: async (
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

  likePost: async (postLikePayload: PostLikePayload): Promise<PostResponse> => {
    const response = await apiClient.post(`/api/like/post`, postLikePayload);
    return response.data;
  },

  unlikePost: async (postId: number): Promise<PostResponse> => {
    const response = await apiClient.delete(`/api/like/post/${postId}`);
    return response.data;
  },
};
