import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import {
  GoogleAccountCreateDto,
  SignInByGoogleDto,
  SignInDto,
  SignOutDto,
} from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerive: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async signIn(dto: SignInDto) {
    const { username, password } = dto;
    const user = await this.userSerive.validateUser({
      username,
      password,
    });

    const payload = {
      iss: this.configService.get<string>('PROJECT_NAME') as string,
      username: user.username,
      email: user.email,
    };

    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.generateRefreshToken(payload);

    //DB에 refreshToken 저장
    await this.userSerive.update(user.id, { refreshToken: refreshToken });

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async signInByGoogle(dto: SignInByGoogleDto) {
    const { username, email, id } = dto;

    const payload = {
      iss: this.configService.get<string>('PROJECT_NAME') as string,
      username,
      email,
    };

    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.generateRefreshToken(payload);

    const user = await this.userSerive.update(id, {
      refreshToken: refreshToken,
    });

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async signOut(dto: SignOutDto) {
    const user = await this.userSerive.findOneByUsername(dto.username);

    //DB에 저장된 refreshToken 삭제
    if (user) {
      return await this.userSerive.removeRefreshToken(user.id);
    }

    if (!user) {
      throw new NotFoundException('Not found user.');
    }
  }

  async generateAccessToken(payload: JwtCreatePayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    return accessToken;
  }

  async generateRefreshToken(payload: JwtCreatePayload) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_KEY'),
    });

    return refreshToken;
  }

  async createGoogleAccount(dto: GoogleAccountCreateDto) {
    const googleAccount = await this.prismaService.googleAccount.create({
      data: {
        ...dto,
      },
    });

    return googleAccount;
  }

  async findGoogleAccountByUserId(userId: number) {
    const googleAccount = await this.prismaService.googleAccount.findUnique({
      where: {
        userId,
      },
    });

    if (!googleAccount) {
      throw new NotFoundException('Not found google account.');
    }

    return googleAccount;
  }

  async findGoogleAccountByEmail(email: string) {
    try {
      const googleAccount = await this.prismaService.googleAccount.findUnique({
        where: {
          email,
        },
      });
      return googleAccount;
    } catch (error) {
      throw new NotFoundException('Not found google account.');
    }
  }

  setTokenCookies(res: Response, tokens: SetTokenCookies) {
    if (tokens.accessToken) {
      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        maxAge: this.configService.get<number>('JWT_MAX_AGE'),
        sameSite: 'lax',
      });
    }

    if (tokens.refreshToken) {
      res.cookie('refreshToken', tokens.accessToken, {
        httpOnly: true,
        maxAge: this.configService.get<number>('JWT_REFRESH_TOKEN_MAX_AGE'),
        sameSite: 'lax',
      });
    }

    return res;
  }
}
