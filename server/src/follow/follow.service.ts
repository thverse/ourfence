import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Follow } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { FolloweeNotFoundException } from './exceptions/followeeNotFound.exception';
@Injectable()
export class FollowService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async followUser(followerId: number, followingId: number): Promise<Follow> {
    if (followerId === followingId) {
      throw new Error('자기 자신을 팔로우할 수 없습니다.');
    }

    if (!(await this.isExistFollowee(followerId, followingId))) {
      throw new FolloweeNotFoundException();
    }

    return await this.prisma.follow.create({
      data: { followerId, followingId },
    });
  }

  async unfollowUser(followerId: number, followingId: number) {
    return await this.prisma.follow.deleteMany({
      where: { followerId, followingId },
    });
  }

  async getFollowers(userId: number) {
    const followers = await this.prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          include: {
            _count: { select: { followers: true, followings: true } },
          },
        },
      },
    });

    return followers.map((follow) => ({
      user: follow.follower,
      followerCount: follow.follower._count.followers,
      followingCount: follow.follower._count.followings,
    }));
  }

  async getFollowing(userId: number) {
    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          include: {
            _count: { select: { followers: true, followings: true } },
          },
        },
      },
    });

    return following.map((follow) => ({
      user: follow.following,
      followerCount: follow.following._count.followers,
      followingCount: follow.following._count.followings,
    }));
  }

  async getFollowerCount(userId: number): Promise<number> {
    return await this.prisma.follow.count({ where: { followingId: userId } });
  }

  async getFollowingCount(userId: number): Promise<number> {
    return await this.prisma.follow.count({ where: { followerId: userId } });
  }

  private async isExistFollowee(
    followerId: number,
    followingId: number,
  ): Promise<boolean> {
    const followerUser = await this.userService.findOneById(followerId);
    const followingUser = await this.userService.findOneById(followingId);

    return !followerUser && !followingUser;
  }
}
