import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcryptjs';
import {
  DuplicateCheckUserDto,
  UserCreateDto,
  UserUpdateDto,
  ValidateUserDto,
} from './dto/user.dto';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(dto: UserCreateDto): Promise<User> {
    //중복 검사
    await this.duplicateCheckUser(dto);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
        userProfile: {
          create: {
            nickname: dto.nickname,
          },
        },
      },
      include: {
        userProfile: true,
      },
    });
    return createdUser;
  }

  async getUsers(): Promise<User[]> {
    const result = await this.prismaService.user.findMany();
    return result;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          username,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async getUserProfile(id: number): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }

    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
    const { username, email, password, refreshToken } = userUpdateDto;
    let condition;
    if (username) {
      condition = { username };
    } else if (email) {
      condition = { email };
    } else if (password) {
      condition = { password };
    } else if (refreshToken) {
      condition = { refreshToken };
    }

    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: condition,
    });
  }

  async deleteRefreshToken(id: number): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async duplicateCheckUser(
    duplicateCheckUserDto: DuplicateCheckUserDto,
  ): Promise<void> {
    const { username, email } = duplicateCheckUserDto;
    const getUserByUsername = await this.getUserByUsername(username);
    const getUserByemail = await this.getUserByEmail(email);

    if (getUserByUsername || getUserByemail) {
      throw new ConflictException('User already exists.');
    }
  }

  async validateUser(dto: ValidateUserDto): Promise<User> {
    const user = await this.getUserByUsername(dto.username);

    if (!user) {
      throw new UnauthorizedException('Please check your username or email.');
    }

    const isPasswordWrong = !(await compare(dto.password, user.password));
    if (isPasswordWrong) {
      throw new UnauthorizedException('Please check your password');
    }

    return user;
  }
}
