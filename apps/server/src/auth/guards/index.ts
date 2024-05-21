import { JwtAuthGuard } from '@server/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@server/auth/guards/roles.guard';
import { GoogleGuard } from '@server/auth/guards/google.guard';
import { YandexGuard } from '@server/auth/guards/yandex.guard';

export const GUARDS = [JwtAuthGuard, RolesGuard, GoogleGuard, YandexGuard];
