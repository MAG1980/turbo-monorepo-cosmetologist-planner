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
/*import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@server/auth/guards/jwt-auth.guard';*/

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(options()),
    TypeOrmModule.forFeature([TokenEntity]),
    UserModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    /*    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },*/
    AuthService,
    ...STRATEGIES,
    ...GUARDS,
  ],
})
export class AuthModule {}
