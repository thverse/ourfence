import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLikeDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}

export class DeleteLikeDto extends CreateLikeDto {}

export class GetLikeDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}

export class GetLikeCountDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
