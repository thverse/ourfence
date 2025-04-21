import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsNotEmpty,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CursorPaginationDto } from 'src/common/dtos/common.dto';
import { PostType } from '../types/post.type';
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  files?: Express.Multer.File[];
}

export class UpdatePostDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  images?: { url: string; type: string }[];
}

export class DeletePostDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}

export class PostImageDto {
  @IsString()
  url: string;

  @IsString()
  type: string;
}

export class GetPostListDto extends CursorPaginationDto {
  @IsEnum(PostType)
  type: PostType;

  @IsOptional()
  @IsString()
  targetUserId?: string;
}
