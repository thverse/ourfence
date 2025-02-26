import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import {
  UserCreateDto,
  UserFindCondition,
  UserFindOneDto,
} from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userCreateDto: UserCreateDto) {
    const createdUser = await this.prismaService.user.create({
      data: {
        ...userCreateDto,
        password: await hash(userCreateDto.password, 10),
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

  async findOne(userFindOneDto: UserFindOneDto) {
    const { email, username, id } = userFindOneDto;

    let condition;

    if (userFindOneDto.type === UserFindCondition.EMAIL) {
      condition = { email };
    } else if (userFindOneDto.type === UserFindCondition.USERNAME) {
      condition = { username };
    } else if (userFindOneDto.type === UserFindCondition.ID) {
      condition = { id };
    }

    const result = await this.prismaService.user.findUnique({
      where: condition,
    });

    return result;
  }

  async findOneById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    throw new NotFoundException();
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
