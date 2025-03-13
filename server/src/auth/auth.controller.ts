import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt.refresh.guard';
import { LocalGuard } from './guards/local.guard';
import { Response } from 'express';
import { GoogleAuthGuard } from './guards/google.guard';
import { AuthRequest } from './types/auth.type';
import { JwtGuard } from './guards/jwt.guard';

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

    this.authService.setTokenCookies(res, tokens);

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

  @Post('signout')
  @UseGuards(JwtGuard)
  async signOut(@Res() res: Response, @Req() req: AuthRequest) {
    const result = await this.authService.signOut(req.user.id);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ result });
  }

  @Get('google-signin')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google-redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { tokens } = await this.authService.signInByGoogle(req.user);

    this.authService.setTokenCookies(res, tokens);

    return res.redirect('http://localhost:3000/');
  }

  @Post('refreshtoken')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id } = req.user;
    const accessToken = await this.authService.generateAccessToken({
      id,
    });

    const tokens = {
      accessToken,
      refreshToken: null,
    };
    this.authService.setTokenCookies(res, tokens);

    return accessToken;
  }

  @Post('refreshtoken-validate')
  @UseGuards(JwtRefreshGuard)
  async refreshtokenValidate(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (req.user) {
      return true;
    }

    return false;
  }
}
