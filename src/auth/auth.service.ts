import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { SignInDto } from 'src/auth/dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerive: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto);
    const payload = {
      iss: this.configService.get<string>('PROJECT_NAME'),
      sub: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_KEY'),
    });

    await this.userSerive.update(user.id, { refreshToken });

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async refreshToken(req) {}

  async validateUser(dto: SignInDto) {
    const user = await this.userSerive.findOne(dto);

    if (!user) {
      throw new UnauthorizedException('Please check your username or email.');
    }

    if (!(await compare(dto.password, user.password))) {
      throw new UnauthorizedException('Please check your password');
    }

    //반환값에 비밀번호 제외
    const { password, ...result } = user;
    return result;
  }
}
