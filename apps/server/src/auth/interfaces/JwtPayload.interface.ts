import { UserRoleEnum } from '@server/user/enums/user-role.enum';

export interface JwtPayload {
  sub: number;
  login: string;
  email: string;
  roles: UserRoleEnum[];
}
