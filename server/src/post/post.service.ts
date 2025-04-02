import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post } from '@prisma/client';
@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
    const { content, images } = createPostDto;

    return await this.prismaService.post.create({
      data: {
        content,
        userId,
        postImages: {
          create:
            images?.map((image) => ({
              url: image.url,
              type: image.type,
            })) || [],
        },
      },
      include: {
        user: true,
        postImages: true,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      include: {
        user: true,
        postImages: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: {
        user: true,
        postImages: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return post;
  }

  async update(
    id: number,
    userId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const { content, images } = updatePostDto;

    // Check if post exists and belongs to user
    const post = await this.prismaService.post.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!post || post.userId !== userId) {
      throw new Error('Post not found or unauthorized');
    }

    return await this.prismaService.post.update({
      where: { id },
      data: {
        content,
        postImages: {
          deleteMany: {},
          create:
            images?.map((image) => ({
              url: image.url,
              type: image.type,
            })) || [],
        },
      },
      include: {
        user: true,
        postImages: true,
      },
    });
  }

  async remove(id: number, userId: number): Promise<Post> {
    // Check if post exists and belongs to user
    const post = await this.prismaService.post.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!post || post.userId !== userId) {
      throw new Error('Post not found or unauthorized');
    }

    return await this.prismaService.post.delete({
      where: { id },
    });
  }
}
