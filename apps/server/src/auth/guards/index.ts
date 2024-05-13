import { JwtAuthGuard } from '@server/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@server/auth/guards/roles.guard';

export const GUARDS = [JwtAuthGuard, RolesGuard];
