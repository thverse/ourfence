import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePostDto,
  DeletePostDto,
  GetPostsDto,
  UpdatePostDto,
} from './dto/post.dto';
import { Post } from '@prisma/client';
import { UploadService } from 'src/upload/upload.service';
import { UserNotFoundException } from 'src/user/exceptions/userNotFound.exception';
@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostDto,
    files: { files: Express.Multer.File[] },
  ): Promise<Post> {
    const { content } = createPostDto;

    if (!userId) {
      throw new UserNotFoundException(userId);
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException(userId);
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

  async getMyPosts(userId: number): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      where: {
        userId,
      },
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

  async getUsersPosts(
    userId: number,
    getPostsDto: GetPostsDto,
  ): Promise<Post[]> {
    const { userIds, page, limit } = getPostsDto;

    return await this.prismaService.post.findMany({
      where: {
        userId: { in: userIds },
      },
      include: {
        user: { select: { username: true } },
        postImages: true,
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
    userId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const { postId, content, images } = updatePostDto;

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post || post.userId !== userId) {
      throw new Error('Post not found or unauthorized');
    }

    return await this.prismaService.post.update({
      where: { id: postId },
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

  async deletePost(
    userId: number,
    deletePostDto: DeletePostDto,
  ): Promise<Post> {
    // Check if post exists and belongs to user
    const { postId } = deletePostDto;
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post || post.userId !== userId) {
      throw new Error('Post not found or unauthorized');
    }

    return await this.prismaService.post.delete({
      where: { id: postId },
    });
  }
}
