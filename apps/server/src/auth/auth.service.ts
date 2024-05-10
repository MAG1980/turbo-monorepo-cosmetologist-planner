import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '@server/auth/auth.repository';
import { SignInUserDto, SignUpUserDto } from '@server/auth/dto';
import type { Token } from '@server/auth/interfaces';
import { UserRepository } from '@server/user/user.repository';
import type { Response } from 'express';
import { REFRESH_TOKEN } from '@server/config';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@server/user/entities/User.entity';
import moment from 'moment-timezone';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto) {
    if (await this.userRepository.isUserExists(signUpUserDto.login)) {
      throw new ConflictException(
        `Пользователь с логином ${signUpUserDto.login} уже существует`,
      );
    }

    return await this.userRepository
      .createEntity(signUpUserDto)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });
  }

  async signIn(signInUserDto: SignInUserDto): Promise<Token> {
    console.log('signInUserDto ', signInUserDto);
    const user = await this.userRepository
      .getUserWithPasswordByLogin(signInUserDto.login)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    if (user && this.authRepository.isPasswordMatch(signInUserDto, user)) {
      return await this.generateTokens(user);
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

  async refreshTokens(refreshToken: string) {
    const token = await this.authRepository.findOne({
      where: { token: refreshToken },
    });

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.authRepository.delete({ token: refreshToken });

    if (moment().isAfter(token.expiration)) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOne({
      where: { id: token.userId },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.generateTokens(user);
  }

  private async generateTokens(user: UserEntity): Promise<Token> {
    const accessToken = await this.authRepository.getAccessToken(user);
    const refreshToken = await this.authRepository.getRefreshToken(user.id);
    return { accessToken, refreshToken };
  }
}
