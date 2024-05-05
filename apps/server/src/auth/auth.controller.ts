import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '@server/auth/auth.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { SignInUserDto, SignUpUserDto } from '@server/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto);
  }

  @Post('/sign-up')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @Get('refresh-token')
  refreshTokens() {}
}
