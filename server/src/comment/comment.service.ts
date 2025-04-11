import { Injectable } from '@nestjs/common';
import {
  CreateCommentDto,
  UpdateCommentDto,
  DeleteCommentDto,
} from './dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from '@prisma/client';
import { CommentNotFoundException } from './exceptions/commentNotFound.exception';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { userId, postId, parentId, content } = createCommentDto;

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
    return comment;
  }

  async getCommentsByUserId(userId: number): Promise<Comment[]> {
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

  async deleteComment(deleteCommentDto: DeleteCommentDto): Promise<Comment> {
    const { commentId } = deleteCommentDto;
    const result = await this.prismaService.comment.delete({
      where: {
        id: commentId,
      },
    });

    if (!result) {
      throw new CommentNotFoundException(commentId);
    }
    return result;
  }
}
