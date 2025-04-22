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
import { CreateLikeDto, DeleteLikeDto, GetLikeCountDto } from './dto/like.dto';
import { DeleteLikeResponse, likeCountResponse, LikeResponse } from 'shared';
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
  ): Promise<LikeResponse> {
    return await this.likeService.likePost(userId, createLikeDto);
  }

  @Delete('post/:postId')
  async deleteLike(
    @User('id') userId: number,
    @Param('postId') postId: number,
  ): Promise<DeleteLikeResponse> {
    return await this.likeService.deleteLikePost(userId, postId);
  }

  @Post('count')
  async getLikeCount(
    @Body() getLikeCountDto: GetLikeCountDto,
  ): Promise<likeCountResponse> {
    return {
      count: await this.likeService.getLikePostCount(getLikeCountDto),
    };
  }
}
