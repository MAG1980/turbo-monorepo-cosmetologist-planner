import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto, SignUpUserDto } from '@server/auth/dto';
import type { Token } from '@server/auth/interfaces';
import type { Response } from 'express';
import { REFRESH_TOKEN } from '@server/config';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@server/user/entities/User.entity';
import moment from 'moment-timezone';
import { UserService } from '@server/user/user.service';
import { AuthenticationProvidersEnum } from '@server/common/enums';
import { compareSync } from 'bcrypt';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '@server/auth/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto) {
    if (await this.userService.isUserExists(signUpUserDto.email)) {
      throw new ConflictException(
        `Пользователь с логином ${signUpUserDto.email} уже существует`,
      );
    }

    return await this.userService
      .create(signUpUserDto, AuthenticationProvidersEnum.LOCAL)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });
  }

  async signIn(signInUserDto: SignInUserDto, agent: string): Promise<Token> {
    console.log('signInUserDto ', signInUserDto, { agent });
    const user = await this.userService
      .findOne(signInUserDto.email, true)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user && this.isPasswordMatch(signInUserDto, user)) {
      return await this.generateTokens(user, agent);
    }

    //Сообщать о том, что именно пароль не прошёл проверку - "дыра" в безопасности
    throw new UnauthorizedException('Неверный логин или пароль!');
  }

  setRefreshTokenHttpOnlyCookie(@Res() response: Response, token: Token) {
    if (!token) {
      throw new UnauthorizedException();
    }
    response.cookie(REFRESH_TOKEN, token.refreshToken.token, {
      //Делает cookie (token) недоступным в клиентской части через JavaScript
      httpOnly: true,
      //Позволяет использовать куки только для текущего домена
      sameSite: 'lax',
      //Позволяет использовать куки на всех страницах текущего домена
      path: '/',
      //Позволяет использовать куки только для HTTPS
      secure: this.isProductionMode(),
      expires: new Date(token.refreshToken.expiration),
    });

    response.status(HttpStatus.OK).json({ accessToken: token.accessToken });
  }

  private isProductionMode() {
    return this.configService.get('NODE_ENV') === 'production';
  }

  async refreshTokens(refreshToken: string, agent: string) {
    const token = await this.tokenRepository.findOne({
      where: { token: refreshToken },
    });

    await this.tokenRepository.delete({
      token: refreshToken,
    });

    if (!token || moment().isAfter(token.expiration)) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(token.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ID = ${token.userId} is not found!`,
      );
    }

    return await this.generateTokens(user, agent);
  }

  private async generateTokens(
    user: UserEntity,
    agent: string,
  ): Promise<Token> {
    const accessToken = await this.getAccessToken(user);
    const refreshToken = await this.getRefreshToken(user.id, agent);
    return { accessToken, refreshToken };
  }

  deleteRefreshToken(refreshToken: string) {
    return this.tokenRepository.delete({ token: refreshToken });
  }

  /**
   * Проверяет наличие в БД пользователя с заданным email,
   * если он не существует, то сохраняет его в БД,
   * возвращает новые JWT-токены, сгенерированные для пользователя
   * @param email
   * @param agent
   * @param authenticationProvider
   */
  async socialProviderAuth(
    email: string,
    agent: string,
    authenticationProvider: AuthenticationProvidersEnum,
  ) {
    const existedUser = await this.userService.findOne(email);
    if (existedUser) {
      /*Если пользователь в различных соцсетях для аутентификации использует один и тот же адрес электронной почты,
      то требуется обновлять свойство "provider" в зависимости от использующейся при аутентификации соцсети.*/
      const updatedUser = await this.userService.update(existedUser.id, {
        ...existedUser,
        provider: authenticationProvider,
      });

      if (!updatedUser) {
        throw new BadRequestException(
          `Не получилось обновить пользователя с ${email} в socialProviderAuth`,
        );
      }

      return this.generateTokens(updatedUser, agent);
    }

    const newUser = await this.userService
      .create({ email }, authenticationProvider)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });
    if (!newUser) {
      throw new BadRequestException(
        `Не получилось создать пользователя с ${email} в GoogleAuth`,
      );
    }
    return this.generateTokens(newUser, agent);
  }

  isPasswordMatch(signInUserDto: SignInUserDto, user: UserEntity) {
    return compareSync(signInUserDto.password, user.password);
  }

  /**
   * Возвращает подписанный JWT-токен, содержащий данные о пользователе
   * Стадия подписания JWT-токена с помощью JwtService, предоставляемого @nestjs/jwt
   * @param user
   */
  async getAccessToken(user: UserEntity) {
    return (
      'Bearer ' +
      (await this.jwtService.signAsync({
        //sub субъект JWT – пользователь, который запросил токен, обычно адрес электронной почты.
        sub: user.id,
        email: user.email,
        roles: user.roles,
      }))
    );
  }

  async getRefreshToken(userId: number, userAgent: string) {
    const refreshToken = this.tokenRepository.create({
      token: v4(),
      expiration: moment().add(30, 'days').format('MM/DD/YYYY'),
      user: { id: userId },
      userAgent,
    });
    const upsert = await this.tokenRepository.upsert(refreshToken, [
      'userId',
      'userAgent',
    ]);
    console.log({ upsert });
    return refreshToken;
  }

  async isTokenValid(token: string) {
    const tokenEntity = await this.tokenRepository.findOne({
      where: { token },
    });
    if (tokenEntity) {
      if (moment().isBefore(tokenEntity.expiration)) {
        return true;
      }
    }
    return false;
  }

  getApiOrigin(): string {
    const environment = this.configService.get('NODE_ENV');
    const protocol = this.configService.get('API_PROTOCOL');
    const host = this.configService.get('API_HOST');
    const port = this.configService.get('API_PORT');

    return `${protocol}://${host}${environment === 'production' ? '' : `:${port}`}`;
  }
}
