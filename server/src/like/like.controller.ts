import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, DeleteLikeDto } from './dto/like.dto';
import { DeleteLikeResponse, likeCountResponse, LikeResponse } from 'shared';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async like(@Body() createLikeDto: CreateLikeDto): Promise<LikeResponse> {
    return await this.likeService.likePost(createLikeDto);
  }

  @Delete()
  async deleteLike(
    @Body() deleteLikeDto: DeleteLikeDto,
  ): Promise<DeleteLikeResponse> {
    return {
      isSuccess: await this.likeService.deleteLikePost(deleteLikeDto),
    };
  }

  @Get(':id')
  async getLikeCount(@Param('id') postId: number): Promise<likeCountResponse> {
    return {
      count: await this.likeService.getLikePostCount(postId),
    };
  }
}
