import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from '@server/auth/auth.repository';
import { UserModule } from '@server/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
