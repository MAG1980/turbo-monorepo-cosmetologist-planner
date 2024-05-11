import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { isPublic } from '@server/auth/decorators';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = isPublic(ctx, this.reflector);
    //Если имеется маркер PUBLIC, то возвращаем true
    if (isPublicRoute) {
      return true;
    }
    //Если нет, то запускаем проверку аутентификации
    return super.canActivate(ctx);
  }
}
