// src/comment/exceptions/commentNotFound.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class CommentNotFoundException extends HttpException {
  constructor(commentId: string | number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Comment with ID "${commentId}" not found`,
        error: 'Comment Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
