import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  Max,
  Min,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class GetPostsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @IsNumber({}, { each: true })
  userIds: number[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
