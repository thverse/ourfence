import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('signin')
  async signin(@Body() dto: any) {
    return await this.userService.create(dto);
  }
}
