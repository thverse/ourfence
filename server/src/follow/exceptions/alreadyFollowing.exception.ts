// src/follow/exceptions/alreadyFollowing.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyFollowingException extends HttpException {
  constructor(followeeId: string | number) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `You are already following user with ID "${followeeId}"`,
        error: 'Already Following',
      },
      HttpStatus.CONFLICT,
    );
  }
}
