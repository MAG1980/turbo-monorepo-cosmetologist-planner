import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type User = {
  id: number;
  displayName: string;
  email: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
};

type VerifyCallback = (
  err?: Error | null | unknown,
  user?: User | false,
  info?: object,
) => void;

@Injectable()
//Создаём стратегию с именем yandex, которое будем использовать при создании guard
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('YANDEX_CLIENT_ID'),
      clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
      callbackURL: `${configService.get('APP_PROTOCOL')}://${configService.get('APP_HOST')}:${configService.get('APP_PORT')}/api/auth/yandex-redirect`,
      // scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const user = {
      id,
      displayName,
      email: emails[0].value,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
