// src/like/exceptions/likeNotFound.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class LikeNotFoundException extends HttpException {
  constructor(postId: string | number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Like for post ID "${postId}" not found`,
        error: 'Like Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
