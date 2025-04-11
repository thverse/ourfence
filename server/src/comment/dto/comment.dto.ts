import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  parentId?: number;

  @IsNotEmpty()
  content: string;
}

export class UpdateCommentDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  commentId: number;

  @IsNotEmpty()
  content: string;
}

export class DeleteCommentDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  commentId: number;
}

export class GetCommentsDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
