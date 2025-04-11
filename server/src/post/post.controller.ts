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
import { PostResponse } from 'shared';
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
  ): Promise<PostResponse> {
    return await this.postService.createPost(userId, createPostDto, files);
  }

  @Get('me')
  getMyPosts(@User('id') userId: number): Promise<PostResponse[]> {
    console.log(userId);
    return this.postService.getMyPosts(userId);
  }

  @Post('by-users')
  getUsersPosts(
    @User('id') userId: number,
    @Body() getPostsDto: GetPostsDto,
  ): Promise<PostResponse[]> {
    return this.postService.getUsersPosts(userId, getPostsDto);
  }

  // @Get(':id')
  // getPost(@Param('id') id: number): Promise<PostResponse> {
  //   return this.postService.getPost(+id);
  // }

  @Patch()
  updatePost(
    @User('id') userId: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponse> {
    return this.postService.updatePost(userId, updatePostDto);
  }

  @Delete()
  deletePost(
    @User('id') userId: number,
    @Body() deletePostDto: DeletePostDto,
  ): Promise<PostResponse> {
    return this.postService.deletePost(userId, deletePostDto);
  }
}
