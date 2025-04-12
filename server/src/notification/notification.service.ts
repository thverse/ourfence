// notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateNotificationDto,
  MarkAsReadNotificationDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    return await this.prismaService.notification.create({
      data: createNotificationDto,
      include: {
        user: true,
      },
    });
  }

  async getNotificationsByUserId(userId: number) {
    return await this.prismaService.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
      },
    });
  }

  async markAsRead(markAsReadNotificationDto: MarkAsReadNotificationDto) {
    const { id, userId } = markAsReadNotificationDto;
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
    return await this.prismaService.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }
}
