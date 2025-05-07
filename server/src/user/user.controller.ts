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
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserCreateDto,
  UserProfileUpdateDto,
  UserUpdateDto,
} from './dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthRequest } from 'src/auth/types/auth.type';
import {
  UserResponse,
  UserWithProfileResponse,
  UserProfileUpdateResponse,
} from '@ourfence/shared';
import { ExcludeFieldsInterceptor } from 'src/common/interceptors/excludeFields.interceptor';
import { User } from 'src/common/decorators/user.decorator';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
@UseGuards(JwtGuard)
@Controller('user')
@UseInterceptors(new ExcludeFieldsInterceptor(['password', 'refreshToken']))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserResponse> {
    return await this.userService.createUser(userCreateDto);
  }

  @Get('/profile')
  async getUserProfile(
    @User('id') currentUserId: number,
    @Query('userId') targetUserId?: string,
  ): Promise<UserWithProfileResponse> {
    // targetUserId가 있고, 현재 로그인한 사용자의 ID와 다른 경우 targetUserId로 조회
    if (targetUserId && currentUserId !== parseInt(targetUserId)) {
      return this.userService.getUserProfile(
        currentUserId,
        parseInt(targetUserId),
      );
    }
    // targetUserId가 없는 경우 자신의 프로필을 조회
    return this.userService.getUserProfile(currentUserId);
  }

  @Post('/profile')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profileImage', maxCount: 1 },
      { name: 'coverImage', maxCount: 1 },
    ]),
  )
  async updateUserProfile(
    @User('id') userId: number,
    @Body() updateUserProfileDto: UserProfileUpdateDto,
    @UploadedFiles()
    images: {
      profileImage: Express.Multer.File[];
      coverImage: Express.Multer.File[];
    },
  ): Promise<UserProfileUpdateResponse> {
    return await this.userService.updateUserProfile(
      userId,
      updateUserProfileDto,
      images,
    );
  }

  @Patch(':id')
  async update(
    @User('id') userId: number,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserResponse> {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  async remove(@User('id') userId: number): Promise<UserResponse> {
    return await this.userService.deleteUser(userId);
  }
}
