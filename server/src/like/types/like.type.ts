import { Like } from '@prisma/client';

export interface LikePostResponse {
  success: boolean;
  message: string;
  like?: Like;
}

export interface UnLikePostResponse {
  success: boolean;
  message: string;
}

export interface LikeCountResponse {
  count: number;
}
