import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from '@server/auth/auth.repository';
import { UserModule } from '@server/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { options } from '@server/config';
import { STRATEGIES } from '@server/auth/strategies';
import { GUARDS } from '@server/auth/guards';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(options()),
    UserModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
