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
  ): Promise<UserWithProfileResponse> {
    return await this.userService.getUserProfile(req.user.id);
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
