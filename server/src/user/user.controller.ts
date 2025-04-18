import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthRequest } from 'src/auth/types/auth.type';
import { UserResponse, UserWithProfileResponse } from 'shared';
import { ExcludeFieldsInterceptor } from 'src/common/interceptors/excludeFields.interceptor';
import { User } from 'src/common/decorators/user.decorator';

@Controller('user')
@UseInterceptors(new ExcludeFieldsInterceptor(['password', 'refreshToken']))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserResponse> {
    return await this.userService.createUser(userCreateDto);
  }

  @Get('/profile')
  @UseGuards(JwtGuard)
  async getUserProfile(
    @Req() req: AuthRequest,
    @Query('userId') targetUserId?: string,
  ): Promise<UserWithProfileResponse> {
    const requestUserId = req.user.id; // 토큰에서 추출한 userId

    // targetUserId가 있고, 현재 로그인한 사용자의 ID와 다른 경우
    if (targetUserId && requestUserId !== parseInt(targetUserId)) {
      return this.userService.getUserProfile(parseInt(targetUserId));
    }
    // 자신의 프로필을 조회하는 경우
    return this.userService.getUserProfile(requestUserId);
  }

  @Patch(':id')
  async update(
    @User('id') userId: number,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserResponse> {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@User('id') userId: number): Promise<UserResponse> {
    return await this.userService.deleteUser(userId);
  }
}
