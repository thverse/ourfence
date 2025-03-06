import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import randomString from 'src/utils/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') as string,
      clientSecret: configService.get<string>('GOOGLE_SECRET_KEY') as string,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') as string,
      scope: ['email', 'profile'],
    });
  }

  // refreshToken 추출 코드
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ) {
    const { displayName, emails, photos, id } = profile;

    //구글 계정 로그인시도때 사용한 구글 이메일로 가입한 일반 계정이 존재한다면 구글 계정과 자동 연결
    //일반 계정이 존재하지 않는다면 구글 계정 정보를 바탕으로 정보 기입 후 가입

    let user = await this.userService.findOneByEmail(emails[0].value);

    if (!user) {
      user = await this.userService.create({
        username: `Google${id}`,
        password: randomString(),
        email: emails[0].value,
      });
    }

    let currentGoogleAccount = await this.authService.findGoogleAccountByEmail(
      emails[0].value,
    );

    if (!currentGoogleAccount) {
      currentGoogleAccount = await this.authService.createGoogleAccount({
        userId: user.id,
        name: displayName,
        email: emails[0].value,
        image: photos[0].value,
      });
    }

    return user;
  }
}
