// src/user/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(userId: string | number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `User with ID "${userId}" not found`,
        error: 'User Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
