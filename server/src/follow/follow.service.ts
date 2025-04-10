import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Follow } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { FollowNotFoundException } from './exceptions/followNotFound.exception';
import { FollowYourselfForbiddenException } from './exceptions/followYourselfForbidden.exception';
@Injectable()
export class FollowService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async followUser(followerId: number, followingId: number): Promise<Follow> {
    if (followerId === followingId) {
      throw new FollowYourselfForbiddenException();
    }

    if (await this.isExistFollowee(followerId, followingId)) {
      throw new FollowNotFoundException();
    }

    return await this.prisma.follow.create({
      data: { followerId, followingId },
    });
  }

  async unfollowUser(
    followerId: number,
    followingId: number,
  ): Promise<boolean> {
    console.log(followerId, followingId);
    if (await this.isExistFollowee(followerId, followingId)) {
      throw new FollowNotFoundException();
    }

    const result = await this.prisma.follow.deleteMany({
      where: { followerId, followingId },
    });

    return result.count > 0 ? true : false;
  }

  async getFollowers(userId: number): Promise<Follow[]> {
    const followers = await this.prisma.follow.findMany({
      where: { followingId: userId },
    });

    return followers;
  }

  async getFollowing(userId: number): Promise<Follow[]> {
    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
    });

    return following;
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

    return !followerUser || !followingUser;
  }
}
