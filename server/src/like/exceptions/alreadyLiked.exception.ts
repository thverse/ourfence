// src/like/exceptions/alreadyLiked.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyLikedException extends HttpException {
  constructor(postId: string | number) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `You have already liked post with ID "${postId}"`,
        error: 'Already Liked',
      },
      HttpStatus.CONFLICT,
    );
  }
}
