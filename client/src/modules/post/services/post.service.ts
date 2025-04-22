import { apiClient } from "@/lib/api";
import {
  GetPostListPayload,
  PostCreatePayload,
  PostLikePayload,
} from "../types/post.type";
import {
  LikePostResponse,
  PostMutationResponse,
  PostResponse,
  UnLikePostResponse,
} from "shared";

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

  likePost: async (
    postLikePayload: PostLikePayload
  ): Promise<LikePostResponse> => {
    const response = await apiClient.post(`/api/like/post`, postLikePayload);
    return response.data;
  },

  unlikePost: async (postId: number): Promise<UnLikePostResponse> => {
    const response = await apiClient.delete(`/api/like/post/${postId}`);
    console.log("unlikePost response : ", response.data);
    return response.data;
  },
};
