import { Injectable } from '@nestjs/common';
import { AuthRepository } from '@server/auth/auth.repository';
import { AuthCredentialsDto } from '@server/auth/dto/auth-credentials.dto';
import { UserService } from '@server/user/user.service';
import { CreateUserDto } from '@server/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    return await this.authRepository.signIn(authCredentialsDto);
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
