import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { FollowService } from './follow.service';
import {
  FollowersResponse,
  FollowingCountResponse,
  FollowersCountResponse,
  FollowingsResponse,
  FollowResponse,
  UnfollowResponse,
} from 'shared';
import { CreateFollowDto, DeleteFollowDto } from './dto/follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post()
  async follow(
    @Body() createfollowDto: CreateFollowDto,
  ): Promise<FollowResponse> {
    return this.followService.followUser(createfollowDto);
  }

  @Delete()
  async unfollow(
    @Body() deleteFollowDto: DeleteFollowDto,
  ): Promise<UnfollowResponse> {
    const result = await this.followService.unfollowUser(deleteFollowDto);

    return {
      isSuccess: result,
    };
  }

  @Get('followers/:userId')
  async getFollowers(
    @Param('userId') userId: number,
  ): Promise<FollowersResponse> {
    return this.followService.getFollowers(userId);
  }

  @Get('following/:userId')
  async getFollowing(
    @Param('userId') userId: number,
  ): Promise<FollowingsResponse> {
    return this.followService.getFollowing(userId);
  }

  @Get('followers/count/:userId')
  async getFollowerCount(
    @Param('userId') userId: number,
  ): Promise<FollowersCountResponse> {
    return { count: await this.followService.getFollowerCount(userId) };
  }

  @Get('following/count/:userId')
  async getFollowingCount(
    @Param('userId') userId: number,
  ): Promise<FollowingCountResponse> {
    return { count: await this.followService.getFollowingCount(userId) };
  }
}
