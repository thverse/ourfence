// src/auth/exceptions/invalid-credentials.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid email or password',
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
