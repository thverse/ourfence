// src/follow/exceptions/followeeNotFound.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class FolloweeNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Check followerId or followingId.`,
        error: 'Followee Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
