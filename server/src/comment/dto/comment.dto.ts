import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CursorPaginationDto } from 'src/common/dtos/common.dto';

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

export class GetCommentListDto extends CursorPaginationDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
