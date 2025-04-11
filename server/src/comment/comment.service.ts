import { Injectable } from '@nestjs/common';
import {
  CreateCommentDto,
  UpdateCommentDto,
  DeleteCommentDto,
  GetCommentsDto,
} from './dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from '@prisma/client';
import { CommentNotFoundException } from './exceptions/commentNotFound.exception';
import { PostService } from 'src/post/post.service';
import { PostNotFoundException } from 'src/post/exceptions/postNotFound.exception';

@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
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
