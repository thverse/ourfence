import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { UserCreateDto } from './dto/user.dto';

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
