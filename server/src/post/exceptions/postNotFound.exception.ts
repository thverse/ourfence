// src/post/exceptions/post-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class PostNotFoundException extends HttpException {
  constructor(postId: string | number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Post with ID "${postId}" not found`,
        error: 'Post Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
