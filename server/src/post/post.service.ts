import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePostDto,
  DeletePostDto,
  GetPostListDto,
  UpdatePostDto,
} from './dto/post.dto';
import { Post } from '@prisma/client';
import { UploadService } from 'src/upload/upload.service';
import { UserNotFoundException } from 'src/user/exceptions/userNotFound.exception';
import { PostMutationResponse, PostResponse } from 'shared';
import { POST_TYPE_CONDITIONS } from './constants/post.constants';
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

  async getPostList(
    userId: number,
    getPostListDto: GetPostListDto,
  ): Promise<PostResponse[]> {
    const { type, cursor, limit } = getPostListDto;

    const condition = POST_TYPE_CONDITIONS[type](userId);

    return await this.prismaService.post.findMany({
      where: {
        ...condition,
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
                id: true,
                profileImageUrl: true,
              },
            },
          },
        },
        postImages: true,
        comments: true,
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
      take: limit,
    });
  }

  async getPost(postId: number): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
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
