// src/auth/exceptions/token-expired.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenExpiredException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Access token has expired',
        error: 'Token Expired',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
