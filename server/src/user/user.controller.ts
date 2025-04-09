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
import { UserResponse } from 'shared';
import { ExcludeFieldsInterceptor } from 'src/common/interceptors/excludeFields.interceptor';

@Controller('user')
@UseInterceptors(new ExcludeFieldsInterceptor(['password', 'refreshToken']))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserResponse> {
    return await this.userService.create(userCreateDto);
  }

  @Get('/profile')
  @UseGuards(JwtGuard)
  async getUserProfile(@Req() req: AuthRequest): Promise<UserResponse> {
    return await this.userService.getUserProfile(req.user.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserResponse> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string): Promise<UserResponse> {
    return await this.userService.remove(+id);
  }
}
