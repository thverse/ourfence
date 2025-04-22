import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, GetLikeCountDto } from './dto/like.dto';
import {
  LikeCountResponse,
  LikePostResponse,
  UnLikePostResponse,
} from 'shared';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
@UseGuards(JwtGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('post')
  async like(
    @User('id') userId: number,
    @Body() createLikeDto: CreateLikeDto,
  ): Promise<LikePostResponse> {
    return await this.likeService.likePost(userId, createLikeDto);
  }

  @Delete('post/:postId')
  async unLike(
    @User('id') userId: number,
    @Param('postId') postId: number,
  ): Promise<UnLikePostResponse> {
    return await this.likeService.unLikePost(userId, postId);
  }

  @Post('count')
  async getLikeCount(
    @Body() getLikeCountDto: GetLikeCountDto,
  ): Promise<LikeCountResponse> {
    return {
      count: await this.likeService.getLikePostCount(getLikeCountDto),
    };
  }
}
