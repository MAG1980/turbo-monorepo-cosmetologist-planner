import { JwtPayload } from '@server/auth/interfaces/JwtPayload.interface';

export interface RequestUser extends Omit<JwtPayload, 'sub'> {
  userId: JwtPayload['sub'];
}
