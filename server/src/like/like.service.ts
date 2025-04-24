import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateLikeDto,
  DeleteLikeDto,
  GetLikeCountDto,
  GetLikeDto,
} from './dto/like.dto';
import { Like, NotificationType } from '@prisma/client';
import { AlreadyLikedException } from './exceptions/alreadyLiked.exception';
import { LikeNotFoundException } from './exceptions/likeNotFound.exception';
import { PostService } from 'src/post/post.service';
import { PostNotFoundException } from 'src/post/exceptions/postNotFound.exception';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { LikePostResponse } from 'shared';
import { NotificationService } from 'src/notification/notification.service';
@Injectable()
export class LikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
    private readonly notificationGateway: NotificationGateway,
    private readonly notificationService: NotificationService,
  ) {}
  async likePost(
    userId: number,
    createLikeDto: CreateLikeDto,
  ): Promise<LikePostResponse> {
    const { postId } = createLikeDto;

    const post = await this.postService.getPost(userId, postId);

    if (!post) {
      throw new PostNotFoundException(postId);
    }

    if (await this.isExistLike({ userId, postId })) {
      throw new AlreadyLikedException(postId);
    }

    const like = await this.prismaService.like.create({
      data: { userId, postId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        post: {
          select: {
            userId: true,
          },
        },
      },
    });

    //자신의 게시글이 아닐 경우에만 알림 생성
    if (post.userId !== userId) {
      const notification = await this.notificationService.createNotification({
        userId: post.userId,
        senderUserId: userId,
        type: NotificationType.LIKE,
        referenceId: postId,
      });

      await this.notificationGateway.sendNotification(
        like.post.userId,
        notification,
      );
    }

    const postWithCurrentUserLikeStatus = {
      ...post,
      isCurrentUserLiked: true,
    };

    return postWithCurrentUserLikeStatus;
  }

  private async isExistLike(getLikeDto: GetLikeDto): Promise<Like | null> {
    const { userId, postId } = getLikeDto;
    const like = await this.prismaService.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    return like;
  }

  async unLikePost(userId: number, postId: number): Promise<LikePostResponse> {
    const post = await this.postService.getPost(userId, postId);

    if (!post) {
      throw new PostNotFoundException(postId);
    }

    const like = await this.isExistLike({ userId, postId });
    if (!like) {
      throw new LikeNotFoundException(postId);
    }

    const result = await this.prismaService.like.delete({
      where: { userId_postId: { userId, postId } },
    });

    const postWithCurrentUserLikeStatus = {
      ...post,
      isCurrentUserLiked: true,
    };

    return postWithCurrentUserLikeStatus;
  }

  async getLikePostCount(getLikeCountDto: GetLikeCountDto): Promise<number> {
    const { postId } = getLikeCountDto;
    return await this.prismaService.like.count({ where: { postId } });
  }
}
