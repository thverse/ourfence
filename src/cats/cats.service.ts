import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats = ['먼치킨', '삼색이', '나비'];

  findAll(): string[] {
    return this.cats;
  }

  findOne(idx: number): string {
    return this.cats[idx];
  }
}
