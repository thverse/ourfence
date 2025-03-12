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

    res.cookie('accessToken', tokens.accessToken);
    res.cookie('refreshToken', tokens.accessToken);

    const { password, refreshToken, ...result } = user;

    return result;
  }

  @Get('google-signin')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request) {}

  @Get('google-redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user, tokens } = await this.authService.signInByGoogle(req.user);
    res.cookie('accessToken', tokens.accessToken);
    res.cookie('refreshToken', tokens.accessToken);

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
