import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from '@server/user/enums/user-role.enum';

export const Roles = Reflector.createDecorator<UserRoleEnum[]>();
