import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '@server/auth/dto/auth-credentials.dto';

@Injectable()
export class AuthRepository {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return authCredentialsDto;
  }
}
