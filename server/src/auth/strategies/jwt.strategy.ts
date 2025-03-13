import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log(request.cookies);

          if (!request.cookies.accessToken) {
            throw new UnauthorizedException('Token not exists');
          }
          return request.cookies.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY') as string,
      // passReqToCallback: true,
    });
  }

  async validate(payload: JwtValidatePayload) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }
}
