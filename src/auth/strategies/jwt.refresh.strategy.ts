import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JsonWebTokenError } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (request.headers.cookie) {
            const refreshToken = request.headers.cookie.replace(
              'refreshToken=',
              '',
            );
            return refreshToken;
          }
          throw new JsonWebTokenError('Refresh token not found.');
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_KEY') as string,
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {}
}
