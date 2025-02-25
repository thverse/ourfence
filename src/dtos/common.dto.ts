import { IsDate } from 'class-validator';

export class DateDto {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
