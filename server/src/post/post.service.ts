import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post } from '@prisma/client';
import { UploadService } from 'src/upload/upload.service';
@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    files: { files: Express.Multer.File[] },
  ): Promise<Post> {
    const { content, userId } = createPostDto;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    //Local
    // const uploadedFiles = files
    //   ? await this.uploadService.uploadFiles(files?.files, userId)
    //   : [];

    const uploadedFiles = files
      ? await this.uploadService.uploadFilesByCloudinary(files?.files, userId)
      : [];

    return await this.prismaService.post.create({
      data: {
        content,
        userId,
        postImages: {
          create:
            uploadedFiles?.map((file) => ({
              url: file.url,
              type: file.type,
            })) || [],
        },
      },
      include: {
        user: true,
        postImages: true,
      },
    });
  }

  async getPosts(): Promise<Post[]> {
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

  async getPost(id: number): Promise<Post> {
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

  async updatePost(
    id: number,
    userId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const { content, images } = updatePostDto;

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

  async deletePost(id: number, userId: number): Promise<Post> {
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
