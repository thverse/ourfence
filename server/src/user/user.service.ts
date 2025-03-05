import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import {
  UserCreateDto,
  UserFindCondition,
  UserFindOneDto,
  UserUpdateDto,
} from './dto/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: UserCreateDto) {
    const createdUser = await this.prismaService.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
    //비밀번호를 제외한 나머지 데이터 반환
    const { password, ...result } = createdUser;
    return result;
  }

  async findAll() {
    const result = await this.prismaService.user.findMany();
    return result;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          username,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }

  async findOneById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    throw new NotFoundException('User not found.');
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    throw new NotFoundException('User not found.');
  }

  async update(id: number, userUpdateDto: UserUpdateDto) {
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

    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: condition,
    });
  }

  async removeRefreshToken(id: number) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: {
          id,
        },
        data: { refreshToken: null },
      });

      const { password, ...result } = updatedUser;
      return result;
    } catch (error) {
      new NotFoundException('Not found user');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
