import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '@server/auth/auth.service';
import { AuthCredentialsDto } from '@server/auth/dto/auth-credentials.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { SignUpUserDto } from '@server/auth/dto/sign-up-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/sign-up')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @Get('refresh-token')
  refreshTokens() {}
}
