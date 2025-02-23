import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsfindOneDto } from 'src/dtos/cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): string[] {
    return this.catsService.findAll();
  }

  @Post()
  findOne(@Body() body: CatsfindOneDto): string {
    return this.catsService.findOne(body.idx);
  }
}
