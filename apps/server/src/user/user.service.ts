import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@server/user/user.repository';
import { SignUpUserDto } from '@server/auth/dto';
import { GetUsersDto, UpdateUserDto } from '@server/user/dto';
import type { JwtPayload } from '@server/auth/interfaces';
import { UserRoleEnum } from '@server/user/enums/user-role.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { UserEntity } from '@server/user/entities/User.entity';
import { ConfigService } from '@nestjs/config';
import { convertToMilliseconds } from '@server/common/utils';
import { AuthenticationProvidersEnum } from '@server/common/enums';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  create(
    signUpUserDto: Partial<SignUpUserDto>,
    provider: AuthenticationProvidersEnum,
  ) {
    return this.userRepository.createEntity(signUpUserDto, provider);
  }

  findAll(getUsersDto: GetUsersDto) {
    return this.userRepository.findAllEntities(getUsersDto);
  }

  async findOne(
    idOrLoginOrEmail: string | number,
    isResetCache: boolean = false,
  ) {
    //Очистка данных в кеш по ключу
    if (isResetCache) {
      await this.cacheManager.del(`user_${idOrLoginOrEmail}`);
      console.log(`User_${idOrLoginOrEmail} deleted from cache`);
    }
    //get from cache
    const user = await this.cacheManager.get<UserEntity>(
      `user_${idOrLoginOrEmail}`,
    );

    if (!user) {
      // get from db
      const user = await this.userRepository.findOneEntity(idOrLoginOrEmail);
      if (!user) {
        return null;
      }

      const ttl = convertToMilliseconds(
        this.configService.get<string>('JWT_EXPIRATION'),
      );

      await this.cacheManager.set(`user_${idOrLoginOrEmail}`, user, ttl);
      console.log(`User_${idOrLoginOrEmail} from database`);
      return user;
    }
    console.log(`User_${idOrLoginOrEmail} from cache`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateEntity(id, updateUserDto);
  }

  async remove(id: number, user: JwtPayload) {
    if (user.sub !== id && !user.roles.includes(UserRoleEnum.ADMIN)) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }
    await Promise.all([
      await this.cacheManager.del(`user_${id}`),
      await this.cacheManager.del(`user_${user.login}`),
    ]);
    return this.userRepository.removeEntity(id);
  }

  async isUserExists(login: string) {
    return await this.userRepository.isUserExists(login);
  }
}
