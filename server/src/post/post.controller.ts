import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthRequest } from '../auth/types/auth.type';
import { PostResponse } from 'shared';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Req() req: AuthRequest,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostResponse> {
    return await this.postService.create(req.user.id, createPostDto);
  }

  @Get()
  findAll(): Promise<PostResponse[]> {
    console.log('findAll');
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostResponse> {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponse> {
    return this.postService.update(+id, req.user.id, updatePostDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: AuthRequest,
  ): Promise<PostResponse> {
    return this.postService.remove(+id, req.user.id);
  }
}
