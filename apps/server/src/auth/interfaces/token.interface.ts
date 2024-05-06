import { TokenEntity } from '@server/auth/entities/token.entity';

export interface Token {
  accessToken: string;
  refreshToken: TokenEntity;
}
