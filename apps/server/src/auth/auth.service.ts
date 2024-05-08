import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '@server/auth/auth.repository';
import { SignInUserDto, SignUpUserDto } from '@server/auth/dto';
import { Token } from '@server/auth/interfaces';
import { UserRepository } from '@server/user/user.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto) {
    const user = await this.userRepository.findOne({
      where: { login: signUpUserDto.login },
    });
    if (user) {
      throw new ConflictException(
        'Пользователь с таким логином уже существует',
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
      const accessToken = await this.authRepository.getAccessToken(user);
      const refreshToken = await this.authRepository.getRefreshToken(user.id);
      return { accessToken, refreshToken };
    }

    //Сообщать о том, что именно пароль не прошёл проверку - "дыра" в безопасности
    throw new UnauthorizedException('Неверный логин или пароль!');
  }
}
