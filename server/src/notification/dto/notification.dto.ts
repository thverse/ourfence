// notification/dto/notification.dto.ts
import { IsEnum, IsNumber, IsString, IsBoolean } from 'class-validator';

export enum NotificationType {
  FOLLOW = 'FOLLOW',
  COMMENT = 'COMMENT',
  LIKE = 'LIKE',
  MENTION = 'MENTION',
}

export class CreateNotificationDto {
  @IsNumber()
  userId: number;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  content: string;

  @IsNumber()
  referenceId: number;
}

export class UpdateNotificationDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  isRead: boolean;
}

export class MarkAsReadNotificationDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;
}
