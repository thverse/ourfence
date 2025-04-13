// search/search.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SearchDto } from './dto/search.dto';

@Controller('search')
@UseGuards(JwtGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('users')
  async searchUsers(@Query() dto: SearchDto) {
    return this.searchService.searchUsers(dto);
  }

  @Get('posts')
  async searchPosts(@Query() dto: SearchDto) {
    return this.searchService.searchPosts(dto);
  }
}
