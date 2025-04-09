// src/comment/exceptions/unauthorizedCommentAccess.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedCommentAccessException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'You are not authorized to delete or update this comment.',
        error: 'Forbidden',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
