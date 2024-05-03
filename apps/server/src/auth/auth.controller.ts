import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@server/auth/auth.service';
import { AuthCredentialsDto } from '@server/auth/dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }
}
