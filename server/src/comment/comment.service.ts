import { Injectable } from '@nestjs/common';
import {
  CreateCommentDto,
  UpdateCommentDto,
  DeleteCommentDto,
  GetCommentsDto,
} from './dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment, NotificationType } from '@prisma/client';
import { CommentNotFoundException } from './exceptions/commentNotFound.exception';
import { PostService } from 'src/post/post.service';
import { PostNotFoundException } from 'src/post/exceptions/postNotFound.exception';
import { NotificationGateway } from 'src/notification/notification.gateway';
@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async createComment(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { postId, parentId, content } = createCommentDto;

    const post = await this.postService.getPost(postId);

    if (!post) {
      new PostNotFoundException(postId);
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
      // 알림 데이터 생성
      const notification = await this.prismaService.notification.create({
        data: {
          type: NotificationType.COMMENT,
          userId: post.userId, // 게시글 작성자에게 알림
          content: `${comment.user.username}님이 회원님의 게시글에 댓글을 남겼습니다: ${comment.content.substring(0, 30)}...`,
          referenceId: comment.id,
        },
      });

      // 실시간 알림 전송
      await this.notificationGateway.sendNotification(
        post.userId,
        notification,
      );
    }

    return comment;
  }

  async getCommentsByUserId(
    getCommentsDto: GetCommentsDto,
  ): Promise<Comment[]> {
    const { userId } = getCommentsDto;
    return await this.prismaService.comment.findMany({
      where: {
        userId,
      },
      include: {
        post: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
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
