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
import { GoogleAuthGuard } from './guards/google.guard';

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

  @Get('google-signin')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user } = req;
    console.log('Inside google controller: ', user);

    res.redirect('/');

    return user;
  }

  @Post('signout')
  @UseGuards(LocalGuard)
  async signOut(
    @Body() dto: SignOutDto,
    @Res({ passthrough: true }) res: Response,
  ) {
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
