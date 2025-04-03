import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePostDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsString()
  content: string;
}

export class UpdatePostDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  images?: { url: string; type: string }[];
}

export class PostImageDto {
  @IsString()
  url: string;

  @IsString()
  type: string;
}
