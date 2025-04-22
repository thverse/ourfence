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
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  CreatePostDto,
  UpdatePostDto,
  DeletePostDto,
  GetPostListDto,
} from './dto/post.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthRequest } from '../auth/types/auth.type';
import { PostMutationResponse, PostResponse } from 'shared';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from 'src/common/decorators/user.decorator';
import { Prisma } from '@prisma/client';

type input = Prisma.UserProfileCreateInput;
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 5 }]))
  async createPost(
    @User('id') userId: number,
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ): Promise<PostMutationResponse> {
    return await this.postService.createPost(userId, createPostDto, files);
  }

  @Post('post_list')
  async getPostList(
    @User('id') userId: number,
    @Body() getPostListDto: GetPostListDto,
  ): Promise<PostResponse[]> {
    return await this.postService.getPostList(userId, getPostListDto);
  }

  @Get(':id')
  getPost(@Param('id') postId: number): Promise<PostResponse> {
    return this.postService.getPost(postId);
  }

  @Patch()
  async updatePost(
    @User('id') userId: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostMutationResponse> {
    return await this.postService.updatePost(userId, updatePostDto);
  }

  @Delete(':id')
  async deletePost(
    @User('id') userId: number,
    @Param('id') postId: number,
  ): Promise<PostMutationResponse> {
    return await this.postService.deletePost(userId, { postId });
  }
}
