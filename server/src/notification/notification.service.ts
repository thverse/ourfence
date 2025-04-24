// notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateNotificationDto,
  ReadNotificationDto,
} from './dto/notification.dto';
import { UserNotFoundException } from 'src/user/exceptions/userNotFound.exception';
import { UserService } from 'src/user/user.service';
@Injectable()
export class NotificationService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const { userId } = createNotificationDto;

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UserNotFoundException(userId);
    }
    return await this.prismaService.notification.create({
      data: createNotificationDto,
      include: {
        user: true,
      },
    });
  }

  async getNotificationList(userId: number) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UserNotFoundException(userId);
    }

    return await this.prismaService.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            userProfile: {
              select: {
                profileImageUrl: true,
                nickname: true,
              },
            },
          },
        },
      },
    });
  }

  async readNotification(readNotificationDto: ReadNotificationDto) {
    const { id, userId } = readNotificationDto;

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UserNotFoundException(userId);
    }
    return await this.prismaService.notification.update({
      where: {
        id,
        userId,
      },
      data: {
        isRead: true,
      },
    });
  }

  async getUnreadCount(userId: number) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UserNotFoundException(userId);
    }
    return await this.prismaService.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }
}
