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

  async create(
    signUpUserDto: Partial<SignUpUserDto>,
    provider: AuthenticationProvidersEnum,
  ) {
    const savedUser = await this.userRepository.createEntity(
      signUpUserDto,
      provider,
    );
    await this.putToCache(savedUser);
    return savedUser;
  }

  updateProvider(email: string, provider: AuthenticationProvidersEnum) {
    return this.userRepository.updateProvider(email, provider);
  }

  findAll(getUsersDto: GetUsersDto) {
    return this.userRepository.findAllEntities(getUsersDto);
  }

  async findOne(idOrEmail: string | number, isResetCache: boolean = false) {
    //Очистка данных в кеш по ключу
    if (isResetCache) {
      await this.removeFromCacheByIdOrEmail(idOrEmail);
      console.log(`User_${idOrEmail} deleted from cache`);
    }
    //get from cache
    const user = await this.cacheManager.get<UserEntity>(`user_${idOrEmail}`);

    if (!user) {
      // get from db
      const user = await this.userRepository.findOneEntity(idOrEmail);
      if (!user) {
        return null;
      }

      await this.putToCache(user);
      console.log(`User_${idOrEmail} from database`);
      return user;
    }
    console.log(`User_${idOrEmail} from cache`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateResult = await this.userRepository.updateEntity(
      id,
      updateUserDto,
    );
    if (!updateResult.affected) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    //При получении пользователя из БД в кеш он будет обновлен
    return await this.findOne(id, true);
  }

  async remove(id: number, user: JwtPayload) {
    if (user.sub !== id && !user.roles.includes(UserRoleEnum.ADMIN)) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }
    await this.removeFromCache(user);
    return this.userRepository.removeEntity(id);
  }

  async isUserExists(loginOrEmail: string) {
    return await this.userRepository.isUserExists(loginOrEmail);
  }

  async putToCache(user: UserEntity) {
    const ttl = convertToMilliseconds(
      this.configService.get<string>('JWT_EXPIRATION'),
    );
    await Promise.all([
      await this.cacheManager.set(`user_${user.id}`, user, ttl),
      await this.cacheManager.set(`user_${user.email}`, user, ttl),
    ]);
  }

  async removeFromCache(user: JwtPayload) {
    await Promise.all([
      await this.cacheManager.del(`user_${user.sub}`),
      await this.cacheManager.del(`user_${user.email}`),
    ]);
  }
  async removeFromCacheByIdOrEmail(idOrEmail: string | number) {
    await this.cacheManager.del(`user_${idOrEmail}`);
  }
}
