import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GoogleAccount, User } from '@prisma/client';
import { Response } from 'express';
import {
  GoogleAccountCreateDto,
  SignInByGoogleDto,
  SignInDto,
} from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthSignInResponse, AuthSignOutResponse } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerive: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async signIn(dto: SignInDto): Promise<AuthSignInResponse> {
    const { username, password } = dto;

    const user = await this.userSerive.validateUser({
      username,
      password,
    });

    const payload = {
      iss: this.configService.get<string>('PROJECT_NAME') as string,
      id: user.id,
    };

    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.generateRefreshToken(payload);

    //DB에 refreshToken 저장
    await this.userSerive.updateUser(user.id, { refreshToken });

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async signInByGoogle(dto: SignInByGoogleDto): Promise<AuthSignInResponse> {
    const { id } = dto;

    const payload = {
      iss: this.configService.get<string>('PROJECT_NAME') as string,
      id,
    };

    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.generateRefreshToken(payload);

    const user = await this.userSerive.updateUser(id, {
      refreshToken,
    });

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async signOut(userId: number): Promise<AuthSignOutResponse> {
    const user = await this.userSerive.getUserById(userId);

    if (!user) {
      throw new NotFoundException('Not found user.');
    }

    //DB에 저장된 refreshToken 삭제
    await this.userSerive.deleteRefreshToken(userId);

    return {
      success: true,
      message: 'Sign out successfully.',
    };
  }

  async generateAccessToken(payload: JwtCreatePayload): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    return accessToken;
  }

  async generateRefreshToken(payload: JwtCreatePayload): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_KEY'),
    });

    return refreshToken;
  }

  async createGoogleAccount(
    dto: GoogleAccountCreateDto,
  ): Promise<GoogleAccount> {
    const googleAccount = await this.prismaService.googleAccount.create({
      data: {
        ...dto,
      },
    });

    return googleAccount;
  }

  async findGoogleAccountByEmail(email: string): Promise<GoogleAccount | null> {
    try {
      const googleAccount = await this.prismaService.googleAccount.findUnique({
        where: {
          email,
        },
      });
      return googleAccount;
    } catch (error) {
      return null;
    }
  }

  setTokenCookies(res: Response, tokens: SetTokenCookies): void {
    if (tokens.accessToken) {
      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        maxAge: this.configService.get<number>('JWT_MAX_AGE'),
        sameSite: 'lax',
      });
    }

    if (tokens.refreshToken) {
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: this.configService.get<number>('JWT_REFRESH_TOKEN_MAX_AGE'),
        sameSite: 'lax',
      });
    }
  }
}
