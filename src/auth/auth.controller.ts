import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignOutDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt.refresh.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { Response } from 'express';

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
  @UseGuards(LocalGuard)
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }

  @Post('signout')
  @UseGuards(LocalGuard)
  async signOut(@Body() dto: SignOutDto) {
    return await this.authService.signOut(dto);
  }

  @Get('refreshtoken')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { username, email } = req.user;
    const accessToken = await this.authService.setAccessToken({
      username,
      email,
    });

    return accessToken;
  }
}
