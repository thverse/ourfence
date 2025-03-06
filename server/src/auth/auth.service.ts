import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OmitType } from '@nestjs/mapped-types';
import { compare } from 'bcryptjs';
import {
  GoogleAccountCreateDto,
  SignInByGoogleDto,
  SignInDto,
  SignOutDto,
} from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidateUserDto } from 'src/user/dto/user.dto';
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
    const user = await this.validateUser({
      username,
      password,
    });

    const payload = {
      iss: this.configService.get<string>('PROJECT_NAME') as string,
      username: user.username,
      email: user.email,
    };

    const accessToken = await this.setAccessToken(payload);

    const refreshToken = await this.setRefreshToken(payload);

    await this.userSerive.update(user.id, { refreshToken: refreshToken });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
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

    const accessToken = await this.setAccessToken(payload);

    const refreshToken = await this.setRefreshToken(payload);

    await this.userSerive.update(id, { refreshToken: refreshToken });

    return {
      id: id,
      email,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async signOut(dto: SignOutDto) {
    const user = await this.userSerive.findOneByUsername(dto.username);

    if (user) {
      return await this.userSerive.removeRefreshToken(user.id);
    }

    if (!user) {
      throw new NotFoundException('Not found user.');
    }
  }

  async setAccessToken(payload: JwtCreatePayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    return accessToken;
  }

  async setRefreshToken(payload: JwtCreatePayload) {
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

  async validateUser(dto: ValidateUserDto) {
    const user = await this.userSerive.findOneByUsername(dto.username);

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
