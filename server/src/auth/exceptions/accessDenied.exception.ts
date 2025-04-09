// src/auth/exceptions/access-denied.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessDeniedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to perform this action.',
        error: 'Access Denied',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
