import { UserRoleEnum } from '@server/user/enums/user-role.enum';

export interface JwtPayload {
  sub: number;
  email: string;
  roles: UserRoleEnum[];
}
