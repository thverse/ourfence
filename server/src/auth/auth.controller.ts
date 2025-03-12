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
import { LocalGuard } from './guards/local.guard';
import { Response } from 'express';
import { GoogleAuthGuard } from './guards/google.guard';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.create(dto);
    const { tokens } = await this.authService.signIn({
      username: user.username,
      password: dto.password,
    });

    res.cookie('accessToken', tokens.accessToken);
    res.cookie('refreshToken', tokens.accessToken);

    const { password, refreshToken, ...result } = user;

    return result;
  }

  @Post('signin')
  @UseGuards(LocalGuard)
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.authService.signIn(dto);

    this.authService.setTokenCookies(res, tokens);

    const { password, refreshToken, ...result } = user;

    return result;
  }

  @Get('google-signin')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google-redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user, tokens } = await this.authService.signInByGoogle(req.user);

    this.authService.setTokenCookies(res, tokens);

    const { password, refreshToken, ...result } = user;

    res.redirect('http://localhost:3000/');
    return result;
  }

  @Post('signout')
  @UseGuards(LocalGuard)
  async signOut(
    @Body() dto: SignOutDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return await this.authService.signOut(dto);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { username, email } = req.user;
    const accessToken = await this.authService.generateAccessToken({
      username,
      email,
    });

    const tokens = {
      accessToken,
      refreshToken: null,
    };
    this.authService.setTokenCookies(res, tokens);

    return accessToken;
  }
}
