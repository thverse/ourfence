import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/auth.dto';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(dto: SignInDto): Promise<Omit<User, 'password'>> {
    console.log('localstrategy', dto.password);
    const user = await this.authService.validateUser(dto);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
