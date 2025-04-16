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
  GetPostsDto,
} from './dto/post.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthRequest } from '../auth/types/auth.type';
import { PostMutationResponse, PostListResponse } from 'shared';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from 'src/common/decorators/user.decorator';

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
  async getUsersPosts(
    @User('id') userId: number,
    @Body() getPostsDto: GetPostsDto,
  ): Promise<PostListResponse[]> {
    return await this.postService.getUsersPosts(userId, getPostsDto);
  }

  // @Get(':id')
  // getPost(@Param('id') id: number): Promise<PostResponse> {
  //   return this.postService.getPost(+id);
  // }

  @Patch()
  async updatePost(
    @User('id') userId: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostMutationResponse> {
    return await this.postService.updatePost(userId, updatePostDto);
  }

  @Delete()
  async deletePost(
    @User('id') userId: number,
    @Body() deletePostDto: DeletePostDto,
  ): Promise<PostMutationResponse> {
    return await this.postService.deletePost(userId, deletePostDto);
  }
}
