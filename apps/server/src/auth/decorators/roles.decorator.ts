// import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from '@server/user/enums/user-role.enum';
import { SetMetadata } from '@nestjs/common';

// export const Roles = Reflector.createDecorator<UserRoleEnum[]>();
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
