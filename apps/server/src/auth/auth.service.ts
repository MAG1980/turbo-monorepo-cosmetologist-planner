import { Injectable } from '@nestjs/common';
import { AuthRepository } from '@server/auth/auth.repository';
import { AuthCredentialsDto } from '@server/auth/dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return await this.authRepository.signUp(authCredentialsDto);
  }
}
