// src/follow/exceptions/followeeNotFound.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class FollowNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Check followerId or followingId.`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
