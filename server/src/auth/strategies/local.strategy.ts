import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }
  async validate(username: string, password: string) {
    const payload = { username, password };
    const user = await this.userService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException({ msg: 'error' });
    }

    return user;
  }
}
