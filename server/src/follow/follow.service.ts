import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Follow, NotificationType } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { FollowNotFoundException } from './exceptions/followNotFound.exception';
import { FollowYourselfForbiddenException } from './exceptions/followYourselfForbidden.exception';
import { CreateFollowDto, DeleteFollowDto } from './dto/follow.dto';
import { NotificationGateway } from 'src/notification/notification.gateway';
@Injectable()
export class FollowService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async followUser(
    userId: number,
    createFollowDto: CreateFollowDto,
  ): Promise<Follow> {
    const { targetUserId } = createFollowDto;

    if (userId === targetUserId) {
      throw new FollowYourselfForbiddenException();
    }

    if (await this.isExistFollowee(userId, targetUserId)) {
      throw new FollowNotFoundException();
    }

    const follow = await this.prismaService.follow.create({
      data: { followerId: targetUserId, followingId: userId },
      include: {
        follower: true,
        following: true,
      },
    });

    const notification = await this.prismaService.notification.create({
      data: {
        type: NotificationType.FOLLOW,
        userId: targetUserId, // 팔로우 받는 사람에게 알림
        content: `${follow.follower.username}님이 회원님을 팔로우하기 시작했습니다.`,
        referenceId: userId,
      },
    });

    await this.notificationGateway.sendNotification(targetUserId, notification);

    return follow;
  }

  async unfollowUser(userId: number, targetUserId: number): Promise<Follow> {
    if (await this.isExistFollowee(userId, targetUserId)) {
      throw new FollowNotFoundException();
    }

    const result = await this.prismaService.follow.delete({
      where: {
        followerId_followingId: {
          followerId: targetUserId,
          followingId: userId,
        },
      },
    });

    if (!result) {
      throw new FollowNotFoundException();
    }

    return result;
  }

  async getFollowers(userId: number): Promise<Follow[]> {
    const followers = await this.prismaService.follow.findMany({
      where: { followingId: userId },
    });

    return followers;
  }

  async getFollowing(userId: number): Promise<Follow[]> {
    const following = await this.prismaService.follow.findMany({
      where: { followerId: userId },
    });

    return following;
  }

  async getFollowerCount(userId: number): Promise<number> {
    return await this.prismaService.follow.count({
      where: { followingId: userId },
    });
  }

  async getFollowingCount(userId: number): Promise<number> {
    return await this.prismaService.follow.count({
      where: { followerId: userId },
    });
  }

  private async isExistFollowee(
    followerId: number,
    followingId: number,
  ): Promise<boolean> {
    const followerUser = await this.userService.getUserById(followerId);
    const followingUser = await this.userService.getUserById(followingId);

    return !followerUser || !followingUser;
  }
}
