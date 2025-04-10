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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthRequest } from '../auth/types/auth.type';
import { PostResponse } from 'shared';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

// @UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 5 }]))
  async createPost(
    @Req() req: AuthRequest,
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ): Promise<PostResponse> {
    return await this.postService.createPost(createPostDto, files);
  }

  @Get()
  getPosts(): Promise<PostResponse[]> {
    return this.postService.getPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: number): Promise<PostResponse> {
    return this.postService.getPost(+id);
  }

  @Patch(':id')
  updatePost(
    @Param('id') id: number,
    @Req() req: AuthRequest,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponse> {
    return this.postService.updatePost(id, req.user.id, updatePostDto);
  }

  @Delete(':id')
  deletePost(
    @Param('id') id: number,
    @Req() req: AuthRequest,
  ): Promise<PostResponse> {
    return this.postService.deletePost(id, req.user.id);
  }
}
