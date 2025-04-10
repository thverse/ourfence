import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFollowDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  followerId: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  followingId: number;
}

export class DeleteFollowDto extends CreateFollowDto {}
