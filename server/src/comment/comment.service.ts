import { Injectable } from '@nestjs/common';
import {
  CreateCommentDto,
  UpdateCommentDto,
  DeleteCommentDto,
  GetCommentListDto,
} from './dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment, NotificationType } from '@prisma/client';
import { CommentNotFoundException } from './exceptions/commentNotFound.exception';
import { PostService } from 'src/post/post.service';
import { PostNotFoundException } from 'src/post/exceptions/postNotFound.exception';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { CommentResponse } from '@ourfence/shared';
import { NotificationService } from 'src/notification/notification.service';
@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async createComment(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { postId, parentId, content } = createCommentDto;

    const post = await this.postService.getPost(userId, postId);

    if (!post) {
      throw new PostNotFoundException(postId);
    }

    const comment = await this.prismaService.comment.create({
      data: {
        userId,
        postId,
        parentId,
        content,
      },

      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // 자신의 게시글이 아닐 경우에만 알림 생성
    if (post.userId !== userId) {
      const notification = await this.notificationService.createNotification({
        userId: post.userId,
        senderUserId: userId,
        type: NotificationType.COMMENT,
        referenceId: postId,
      });

      // 실시간 알림 전송
      await this.notificationGateway.sendNotification(
        post.userId,
        notification,
      );
    }

    return comment;
  }

  async getCommentList(
    userId: number,
    getCommentListDto: GetCommentListDto,
  ): Promise<CommentResponse[]> {
    const { postId, cursor, limit } = getCommentListDto;
    return await this.prismaService.comment.findMany({
      where: {
        postId,
        createdAt: {
          gt: cursor ? new Date(cursor) : undefined,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            userProfile: {
              select: {
                nickname: true,
                profileImageUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  async updateComment(updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const { commentId, content } = updateCommentDto;

    const comment = await this.prismaService.comment.update({
      where: {
        id: commentId,
      },
      data: { content },
    });
    return comment;
  }

  async deleteComment(
    userId: number,
    deleteCommentDto: DeleteCommentDto,
  ): Promise<Comment> {
    const { commentId } = deleteCommentDto;
    const result = await this.prismaService.comment.delete({
      where: {
        id: commentId,
        userId,
      },
    });

    if (!result) {
      throw new CommentNotFoundException(commentId);
    }
    return result;
  }
}
