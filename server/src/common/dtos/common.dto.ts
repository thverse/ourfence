import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class DateDto {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class CursorPaginationDto {
  @IsString()
  cursor?: string; // createdAt

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 10; //
}
