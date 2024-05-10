import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from '@server/auth/auth.service';
import { SignInUserDto, SignUpUserDto } from '@server/auth/dto';
import { REFRESH_TOKEN } from '@server/config';
import { Cookie, UserAgent } from '@server/auth/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    const user = await this.authService.signUp(signUpUserDto);
    if (!user) {
      throw new BadRequestException(
        `Не удаётся зарегистрировать пользователя с данными ${JSON.stringify(
          signUpUserDto,
        )}`,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res() response: Response,
    @UserAgent() agent: string,
  ) {
    const token = await this.authService.signIn(signInUserDto, agent);

    console.log({ agent });
    if (!token) {
      throw new UnauthorizedException(
        `Не удаётся авторизовать пользователя с данными ${JSON.stringify(
          signInUserDto,
        )}`,
      );
    }
    this.authService.setRefreshTokenHttpOnlyCookie(response, token);
  }

  @Get('refresh-token')
  async refreshTokens(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() response: Response,
    @UserAgent() agent: string,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens = await this.authService.refreshTokens(refreshToken, agent);
    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.authService.setRefreshTokenHttpOnlyCookie(response, tokens);
    // return { refreshToken: REFRESH_TOKEN };
  }
}
