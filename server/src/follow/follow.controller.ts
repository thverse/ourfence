import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import {
  FollowersResponse,
  FollowingCountResponse,
  FollowersCountResponse,
  FollowingsResponse,
  FollowResponse,
  UnfollowResponse,
} from 'shared';
import {
  CreateFollowDto,
  DeleteFollowDto,
  GetFollowersByUserIdDto,
  GetFollowingByUserIdDto,
} from './dto/follow.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
@UseGuards(JwtGuard)
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
  ): Promise<FollowResponse> {
    return await this.followService.unfollowUser(deleteFollowDto);
  }

  @Get('followers/me')
  async getMyFollowers(@User('id') userId: number): Promise<FollowersResponse> {
    return this.followService.getFollowers(userId);
  }

  @Get('following/me')
  async getMyFollowing(
    @User('id') userId: number,
  ): Promise<FollowingsResponse> {
    return this.followService.getFollowing(userId);
  }

  @Get('followers/count/me')
  async getMyFollowerCount(
    @User('id') userId: number,
  ): Promise<FollowersCountResponse> {
    return { count: await this.followService.getFollowerCount(userId) };
  }

  @Get('following/count/me')
  async getMyFollowingCount(
    @User('id') userId: number,
  ): Promise<FollowingCountResponse> {
    return { count: await this.followService.getFollowingCount(userId) };
  }

  @Post('followers/userid')
  async getFollowersByUserId(
    @Body() getFollowersByUserIdDto: GetFollowersByUserIdDto,
  ): Promise<FollowersResponse> {
    const { userId } = getFollowersByUserIdDto;
    return this.followService.getFollowers(userId);
  }

  @Post('following/userid')
  async getFollowingByUserId(
    @Body() getFollowingByUserIdDto: GetFollowingByUserIdDto,
  ): Promise<FollowingsResponse> {
    const { userId } = getFollowingByUserIdDto;
    return this.followService.getFollowing(userId);
  }

  @Post('followers/count/userid')
  async getFollowersCountByUserId(
    @Body() getFollowersByUserIdDto: GetFollowersByUserIdDto,
  ): Promise<FollowersCountResponse> {
    const { userId } = getFollowersByUserIdDto;
    return { count: await this.followService.getFollowerCount(userId) };
  }

  @Post('following/count/userid')
  async getFollowingCountByUserId(
    @Body() getFollowingByUserIdDto: GetFollowingByUserIdDto,
  ): Promise<FollowingCountResponse> {
    const { userId } = getFollowingByUserIdDto;
    return { count: await this.followService.getFollowingCount(userId) };
  }
}
