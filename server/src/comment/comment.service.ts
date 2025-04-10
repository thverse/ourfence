import { Injectable } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
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

  async findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async deleteComment(id: number) {
    return `This action removes a #${id} comment`;
  }
}
