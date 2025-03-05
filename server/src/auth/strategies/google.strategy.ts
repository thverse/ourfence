import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') as string,
      clientSecret: configService.get<string>('GOOGLE_SECRET_KEY') as string,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') as string,
      scope: ['email', 'profile'],
    });
  }

  // refreshToken를 얻기 위한 필수 코드
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account',
    };
  }

  validate(accessToken: string, refreshToken: string, profile: GoogleProfile) {
    const { id, provider, displayName, emails, photos } = profile;

    const user = this.userService.findOneByEmail(emails[0].value);

    if (!user) {
    }
    return {
      id,
      provider,
      name: displayName,
      email: emails[0].value,
      photo: photos[0].value,
    };
  }
}
