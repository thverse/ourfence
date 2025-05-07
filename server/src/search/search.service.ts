// search/search.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchDto } from './dto/search.dto';
import { SearchUserResponse, SearchPostResponse } from '@ourfence/shared';

@Injectable()
export class SearchService {
  constructor(private readonly prismaService: PrismaService) {}

  async searchUsers(dto: SearchDto): Promise<SearchUserResponse> {
    const skip = (dto.page - 1) * dto.limit;

    const [users, total] = await Promise.all([
      this.prismaService.user.findMany({
        where: {
          OR: [
            { username: { contains: dto.keyword } },
            { userProfile: { nickname: { contains: dto.keyword } } },
          ],
          deletedAt: null,
        },

        include: {
          userProfile: true,
          _count: {
            select: {
              followers: true,
              followings: true,
              posts: true,
            },
          },
        },
        skip,
        take: dto.limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.user.count({
        where: {
          OR: [
            { username: { contains: dto.keyword } },
            { userProfile: { nickname: { contains: dto.keyword } } },
          ],
          deletedAt: null,
        },
      }),
    ]);

    return {
      users,
      pagination: {
        total,
        page: dto.page,
        limit: dto.limit,
        totalPages: Math.ceil(total / dto.limit),
      },
    };
  }

  async searchPosts(dto: SearchDto): Promise<SearchPostResponse> {
    const skip = (dto.page - 1) * dto.limit;

    const [posts, total] = await Promise.all([
      this.prismaService.post.findMany({
        where: {
          OR: [
            { content: { contains: dto.keyword } },
            {
              user: {
                OR: [
                  { username: { contains: dto.keyword } },
                  { userProfile: { nickname: { contains: dto.keyword } } },
                ],
              },
            },
          ],
          deletedAt: null,
        },
        include: {
          user: {
            include: {
              userProfile: true,
            },
          },
          postImages: true,
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
        skip,
        take: dto.limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.post.count({
        where: {
          OR: [
            { content: { contains: dto.keyword } },
            {
              user: {
                OR: [
                  { username: { contains: dto.keyword } },
                  { userProfile: { nickname: { contains: dto.keyword } } },
                ],
              },
            },
          ],
          deletedAt: null,
        },
      }),
    ]);

    return {
      posts,
      pagination: {
        total,
        page: dto.page,
        limit: dto.limit,
        totalPages: Math.ceil(total / dto.limit),
      },
    };
  }
}
