// notification/notification.controller.ts
import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  ReadNotificationDto,
} from './dto/notification.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return await this.notificationService.createNotification(
      createNotificationDto,
    );
  }

  @Get()
  async getNotificationList(@User('id') userId: number) {
    return await this.notificationService.getNotificationList(userId);
  }

  @Post('read')
  async readNotification(
    @User('id') userId: number,
    @Body('notificationId') notificationId: number,
  ) {
    const readNotificationDto: ReadNotificationDto = {
      id: notificationId,
      userId,
    };
    return await this.notificationService.readNotification(readNotificationDto);
  }

  @Get('unread-count')
  async getUnreadCount(@User('id') userId: number) {
    const count = await this.notificationService.getUnreadCount(userId);
    return { count };
  }
}
