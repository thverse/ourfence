import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
  DeleteCommentDto,
  GetCommentListDto,
} from './dto/comment.dto';
import { User } from 'src/common/decorators/user.decorator';
import { CommentMutationResponse, CommentResponse } from '@ourfence/shared';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @User('id') userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentMutationResponse> {
    return await this.commentService.createComment(userId, createCommentDto);
  }

  @Get()
  async getCommentList(
    @User('id') userId: number,
    @Query() getCommentListDto: GetCommentListDto,
  ): Promise<CommentResponse[]> {
    return await this.commentService.getCommentList(userId, getCommentListDto);
  }

  @Patch()
  async updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentMutationResponse> {
    return await this.commentService.updateComment(updateCommentDto);
  }

  @Delete()
  async deleteComment(
    @User('id') userId: number,
    @Query() deleteCommentDto: DeleteCommentDto,
  ): Promise<CommentMutationResponse> {
    return await this.commentService.deleteComment(userId, deleteCommentDto);
  }
}
