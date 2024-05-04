import { Injectable } from '@nestjs/common';
import { AuthRepository } from '@server/auth/auth.repository';
import { UserService } from '@server/user/user.service';
import { SignUpUserDto } from '@server/auth/dto/sign-up-user.dto';
import { SignInUserDto } from '@server/auth/dto/sign-in-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    return await this.authRepository.signIn(signInUserDto);
  }

  async signUp(signUpUserDto: SignUpUserDto) {
    return await this.userService.create(signUpUserDto);
  }
}
