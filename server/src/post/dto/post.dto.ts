import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  images?: { url: string; type: string }[];
}

export class UpdatePostDto {
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
