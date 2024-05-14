import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Roles } from '@server/auth/decorators';
import { UserRoleEnum } from '@server/user/enums/user-role.enum';
import { JwtPayload } from '@server/auth/interfaces';
import { ROLES_KEY } from '@server/auth/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(ctx: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndMerge<UserRoleEnum[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    //Если маршрут доступен для всех ролей (в декораторе роли не указаны), то разрешает активацию маршрута
    if (!requiredRoles.length) {
      return true;
    }

    //Если нет, то запускаем проверку наличия необходимых ролей у текущего пользователя
    const { user }: { user: JwtPayload } = ctx.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
