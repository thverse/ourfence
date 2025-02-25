import {
  INestApplication,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  //Nestjs 모듈 초기화할때 DB연결 하는 함수
  async onModuleInit() {
    await this.$connect();
  }

  //어플리케이션이 종료될때 DB연결을 해제하는 함수
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
