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
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CommentResponse, CommentsResponse } from 'shared';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponse> {
    return await this.commentService.create(createCommentDto);
  }

  @Get()
  async getComments(
    @Param('userId') userId: number,
  ): Promise<CommentsResponse> {
    return this.commentService.getCommentsByUserId(userId);
  }

  @Patch(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(+id, updateCommentDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(+id);
  }
}
