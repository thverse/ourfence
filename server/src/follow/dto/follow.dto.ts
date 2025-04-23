import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFollowDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  targetUserId: number;
}

export class DeleteFollowDto extends CreateFollowDto {}

export class GetFollowersByUserIdDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class GetFollowingByUserIdDto extends GetFollowersByUserIdDto {}
