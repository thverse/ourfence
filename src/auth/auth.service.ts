import { Injectable } from '@nestjs/common';
import { SignInDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  async signIn(dto: SignInDto) {}

  async validateUser(dto: SignInDto) {}
}
