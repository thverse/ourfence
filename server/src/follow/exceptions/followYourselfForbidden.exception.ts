import { HttpException, HttpStatus } from '@nestjs/common';

export class FollowYourselfForbiddenException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: `Can't follow yourself`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
