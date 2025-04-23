// src/post/exceptions/post-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedPostAccessException extends HttpException {
  constructor(postId: string | number) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: `Post with ID "${postId}" is not authorized`,
        error: 'Unauthorized Post Access',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
