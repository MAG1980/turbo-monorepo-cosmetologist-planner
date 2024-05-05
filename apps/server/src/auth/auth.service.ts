import { Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from '@server/auth/auth.repository';
import { UserService } from '@server/user/user.service';
import { SignInUserDto, SignUpUserDto } from '@server/auth/dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    return await this.authRepository.signIn(signInUserDto);
  }

  async signUp(signUpUserDto: SignUpUserDto) {
    return await this.userService.create(signUpUserDto).catch((error) => {
      this.logger.error(error);
      return null;
    });
  }
}
