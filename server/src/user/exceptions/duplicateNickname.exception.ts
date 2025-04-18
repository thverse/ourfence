import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateNicknameException extends HttpException {
  constructor(nickname: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `User with nickname "${nickname}" already exists`,
        error: 'Duplicate Nickname',
      },
      HttpStatus.CONFLICT,
    );
  }
}
