import { JwtStrategy } from '@server/auth/strategies/jwt.strategy';
import { GoogleStrategy } from '@server/auth/strategies/google.strategy';
import { YandexStrategy } from '@server/auth/strategies/yandex.strategy';

export const STRATEGIES = [JwtStrategy, GoogleStrategy, YandexStrategy];
