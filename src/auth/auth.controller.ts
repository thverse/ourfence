import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    return await this.userService.create(dto);
  }

  @Post('signin')
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }
}
