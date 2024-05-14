import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@server/user/entities/User.entity';
import { UserRepository } from '@server/user/user.repository';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CacheModule.register()],
  exports: [UserService, UserRepository],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
