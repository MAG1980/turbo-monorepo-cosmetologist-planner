import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const jwtModuleOptions = (config: ConfigService) => ({
  secret: config.get('JWT_SECRET'),
  signOptions: { expiresIn: config.get('JWT_EXPIRATION') || '5m' },
});
export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
