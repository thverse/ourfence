// src/user/exceptions/duplicate-user.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateUserException extends HttpException {
  constructor(email: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `User with email "${email}" already exists`,
        error: 'Duplicate User',
      },
      HttpStatus.CONFLICT,
    );
  }
}
