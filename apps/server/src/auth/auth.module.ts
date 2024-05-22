import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@server/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { options } from '@server/config';
import { STRATEGIES } from '@server/auth/strategies';
import { GUARDS } from '@server/auth/guards';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from '@server/auth/entities/token.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(options()),
    TypeOrmModule.forFeature([TokenEntity]),
    UserModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
