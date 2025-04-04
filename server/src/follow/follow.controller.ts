import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post()
  async follow(@Body() body: { followerId: number; followingId: number }) {
    const { followerId, followingId } = body;
    return this.followService.followUser(followerId, followingId);
  }

  @Delete()
  async unfollow(@Body() body: { followerId: number; followingId: number }) {
    const { followerId, followingId } = body;
    return this.followService.unfollowUser(followerId, followingId);
  }

  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: number) {
    return this.followService.getFollowers(userId);
  }

  @Get('following/:userId')
  async getFollowing(@Param('userId') userId: number) {
    return this.followService.getFollowing(userId);
  }

  @Get('followers/count/:userId')
  async getFollowerCount(@Param('userId') userId: number) {
    return { count: await this.followService.getFollowerCount(userId) };
  }

  @Get('following/count/:userId')
  async getFollowingCount(@Param('userId') userId: number) {
    return { count: await this.followService.getFollowingCount(userId) };
  }
}
