import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@server/auth/interfaces';
import { UserService } from '@server/user/user.service';
import { RequestUser } from '@server/auth/interfaces/request-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      //Метод, с помощью которого JWT будет извлечен из запроса
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //Секретный ключ. (Открытый ключ в кодировке PEM может быть более подходящими для приложений в production)
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /*Passport сначала проверяет подпись JWT и декодирует JSON.
  Затем он вызывает наш метод validate(), передавая декодированный JSON в качестве его единственного параметра.
  Основываясь на том, как работает подпись JWT, мы гарантируем, что получаем действительный токен,
  который мы ранее подписали и выдали действительному пользователю.
  Passport построит объект пользователя на основе возвращаемого значения нашего метода validate()
  и прикрепит его в качестве свойства к объекту запроса.
  В методе validate() можно извлекать из БД дополнительную информацию о пользователе,
  в результате чего в нашем Request будет доступен более обогащенный user объект*/
  async validate(payload: JwtPayload): Promise<RequestUser> {
    const userId = payload.sub;
    const user = await this.userService.findOne(userId).catch((error) => {
      this.logger.error(error);
      return null;
    });
    //Аутентификация доступна только для существующих пользователей без блокировки
    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
