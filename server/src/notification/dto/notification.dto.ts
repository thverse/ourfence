// notification/dto/notification.dto.ts
import { NotificationType } from '@prisma/client';
import { IsEnum, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  senderUserId: number;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNumber()
  referenceId: number;
}

export class UpdateNotificationDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  isRead: boolean;
}

export class ReadNotificationDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;
}
