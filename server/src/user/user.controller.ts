import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthRequest } from 'src/auth/types/auth.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userCreateDto: UserCreateDto) {
    return this.userService.create(userCreateDto);
  }

  @Get('/profile')
  @UseGuards(JwtGuard)
  async getUserProfile(@Req() req: AuthRequest) {
    console.log('profile requested');
    const { refreshToken, ...result } = await this.userService.findOneById(
      req.user.id,
    );
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
