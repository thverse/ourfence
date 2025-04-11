import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateLikeDto,
  DeleteLikeDto,
  GetLikeCountDto,
  GetLikeDto,
} from './dto/like.dto';
import { Like } from '@prisma/client';
import { AlreadyLikedException } from './exceptions/alreadyLiked.exception';
import { LikeNotFoundException } from './exceptions/likeNotFound.exception';
@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}
  async likePost(userId: number, createLikeDto: CreateLikeDto): Promise<Like> {
    const { postId } = createLikeDto;

    if (await this.isExistLike({ userId, postId })) {
      throw new AlreadyLikedException(postId);
    }

    return await this.prismaService.like.create({
      data: { userId, postId },
    });
  }

  private async isExistLike(getLikeDto: GetLikeDto): Promise<Like | null> {
    const { userId, postId } = getLikeDto;
    const like = await this.prismaService.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    return like;
  }

  async deleteLikePost(
    userId: number,
    deleteLikeDto: DeleteLikeDto,
  ): Promise<Like> {
    const { postId } = deleteLikeDto;

    const result = await this.prismaService.like.delete({
      where: { userId_postId: { userId, postId } },
    });

    if (!result) {
      throw new LikeNotFoundException(postId);
    }

    return result;
  }

  async getLikePostCount(getLikeCountDto: GetLikeCountDto): Promise<number> {
    const { postId } = getLikeCountDto;
    return await this.prismaService.like.count({ where: { postId } });
  }
}
