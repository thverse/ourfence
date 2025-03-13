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

  async create(dto: UserCreateDto) {
    //중복 검사
    await this.duplicateCheckUser(dto);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
    return createdUser;
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

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
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

  async duplicateCheckUser(
    duplicateCheckUserDto: DuplicateCheckUserDto,
  ): Promise<void> {
    const { username, email } = duplicateCheckUserDto;
    const getUserByUsername = await this.findOneByUsername(username);
    const getUserByemail = await this.findOneByEmail(email);

    if (getUserByUsername || getUserByemail) {
      throw new ConflictException('User already exists.');
    }
  }

  async validateUser(dto: ValidateUserDto) {
    const user = await this.findOneByUsername(dto.username);

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
