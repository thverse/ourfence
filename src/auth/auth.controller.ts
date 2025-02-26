import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    return await this.userService.create(dto);
  }

  @Post('signin')
  async signIn(@Body() dto: any) {
    return await this.userService.create(dto);
  }
}
