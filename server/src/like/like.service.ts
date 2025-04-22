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
@Injectable()
export class LikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
    private readonly notificationGateway: NotificationGateway,
  ) {}
  async likePost(userId: number, createLikeDto: CreateLikeDto): Promise<Like> {
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
      const notification = await this.prismaService.notification.create({
        data: {
          type: NotificationType.LIKE,
          userId: post.userId, // 게시글 작성자에게 알림
          content: `${like.user.username}님이 회원님의 게시글을 좋아합니다.`,
          referenceId: postId,
        },
      });

      await this.notificationGateway.sendNotification(
        like.post.userId,
        notification,
      );
    }

    return like;
  }

  private async isExistLike(getLikeDto: GetLikeDto): Promise<Like | null> {
    const { userId, postId } = getLikeDto;
    const like = await this.prismaService.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    return like;
  }

  async deleteLikePost(userId: number, postId: number): Promise<Like> {
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
