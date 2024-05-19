import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from '@server/auth/auth.service';
import { SignInUserDto, SignUpUserDto } from '@server/auth/dto';
import { REFRESH_TOKEN } from '@server/config';
import { Cookie, Public, UserAgent } from '@server/auth/decorators';
import { UserResponse } from '@server/user/responses';
import { GoogleGuard } from '@server/auth/guards/google.guard';
import type { RequestInterface } from '@server/auth/interfaces/request.interface';
import { HttpService } from '@nestjs/axios';
import { mergeMap } from 'rxjs';
import { handleTimeoutAndErrors } from '@server/common/helpers';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
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

    return new UserResponse(user);
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

  @Post('sign-out')
  async signOut(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      return response
        .sendStatus(HttpStatus.OK)
        .json({ message: 'Вы вышли из системы' });
    }
    await this.authService.deleteRefreshToken(refreshToken);
    // response.clearCookie(REFRESH_TOKEN);
    response.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
    response.status(HttpStatus.OK).json({ message: 'Вы вышли из системы' });
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  googleAuth() {
    return { message: 'Google Authentication' };
  }

  @UseGuards(GoogleGuard)
  @Get('google-redirect')
  googleRedirect(@Req() request: RequestInterface, @Res() response: Response) {
    /*    //Просмотр профиля пользователя в браузере
    return request.user;*/
    const token = request.user['accessToken'];

    console.log({ token });
    //"Пробрасывание" accessToken, сгенерированного сервером Google, на Frontend
    return response.redirect(
      `http://localhost:5000/auth/success?token=${token}`,
    );
  }

  //Имитация обработки на стороне Frontend token, перенаправленного с эндпойнта /auth/google-redirect
  @Get('success')
  success(@Query('token') token: string, @UserAgent() agent: string) {
    //На Frontend извлекаем из query-параметра строки запроса accessToken.
    //Используем accessToken для получения информации о пользователе с сервера Google.
    //Имитируем Get запрос к серверу на стороне Frontend.
    return (
      this.httpService
        .get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
          {},
        )
        //httpService @nestjs/axios возвращает Observable
        .pipe(
          //mergeMap позволяет одновременно активировать несколько внутренних подписок
          mergeMap(
            //Деструктурируем полученные данные (response.data) и отправляем их на Frontend
            ({ data: { email } }) => this.authService.googleAuth(email, agent),
          ),
          // С mergeMap возможна утечка памяти из-за долгоживущих внутренних подписок,
          // поэтому при истечении времени ожидания внутренней подписки выбрасываем исключение с помощью handleTimeoutAndErrors
          handleTimeoutAndErrors(),
        )
    );
  }
  //Если информация о пользователе получена успешно, то считаем, что пользователь вошел в систему
  //Генерируем JWT-токены для обмена данными между клиентом и сервером и отправляем их на Frontend
}
