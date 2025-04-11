import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
  DeleteCommentDto,
} from './dto/comment.dto';
import { CommentResponse, CommentsResponse } from 'shared';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponse> {
    return await this.commentService.createComment(createCommentDto);
  }

  @Get()
  async getComments(
    @Param('userId') userId: number,
  ): Promise<CommentsResponse> {
    return await this.commentService.getCommentsByUserId(userId);
  }

  @Patch()
  async updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentResponse> {
    return await this.commentService.updateComment(updateCommentDto);
  }

  @Delete()
  async deleteComment(
    @Body() deleteCommentDto: DeleteCommentDto,
  ): Promise<CommentResponse> {
    return await this.commentService.deleteComment(deleteCommentDto);
  }
}
