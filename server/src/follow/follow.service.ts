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

  async followUser(createFollowDto: CreateFollowDto): Promise<Follow> {
    const { followerId, followingId } = createFollowDto;

    if (followerId === followingId) {
      throw new FollowYourselfForbiddenException();
    }

    if (await this.isExistFollowee(followerId, followingId)) {
      throw new FollowNotFoundException();
    }

    const follow = await this.prismaService.follow.create({
      data: { followerId, followingId },
      include: {
        follower: true,
        following: true,
      },
    });

    const notification = await this.prismaService.notification.create({
      data: {
        type: NotificationType.FOLLOW,
        userId: followingId, // 팔로우 받는 사람에게 알림
        content: `${follow.follower.username}님이 회원님을 팔로우하기 시작했습니다.`,
        referenceId: followerId,
      },
    });

    await this.notificationGateway.sendNotification(followingId, notification);

    return follow;
  }

  async unfollowUser(deleteFollowDto: DeleteFollowDto): Promise<Follow> {
    const { followerId, followingId } = deleteFollowDto;
    if (await this.isExistFollowee(followerId, followingId)) {
      throw new FollowNotFoundException();
    }

    const result = await this.prismaService.follow.delete({
      where: { followerId_followingId: { followerId, followingId } },
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
    const followerUser = await this.userService.findOneById(followerId);
    const followingUser = await this.userService.findOneById(followingId);

    return !followerUser || !followingUser;
  }
}
