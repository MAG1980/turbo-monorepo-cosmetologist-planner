import { JwtStrategy } from '@server/auth/strategies/jwt.strategy';
import { GoogleStrategy } from '@server/auth/strategies/google.strategy';

export const STRATEGIES = [JwtStrategy, GoogleStrategy];
