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
  UserProfileResponse,
} from 'shared';
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
    @User('id') userId: number,
    @Query('userId') targetUserId?: string,
  ): Promise<UserWithProfileResponse> {
    // targetUserId가 있고, 현재 로그인한 사용자의 ID와 다른 경우
    if (targetUserId && userId !== parseInt(targetUserId)) {
      return this.userService.getUserProfile(parseInt(targetUserId));
    }
    // 자신의 프로필을 조회하는 경우
    return this.userService.getUserProfile(userId);
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
  ): Promise<UserProfileResponse> {
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
