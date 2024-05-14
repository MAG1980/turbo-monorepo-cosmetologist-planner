import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  create(signUpUserDto: SignUpUserDto) {
    return this.userRepository.createEntity(signUpUserDto);
  }

  findAll(getUsersDto: GetUsersDto) {
    return this.userRepository.findAllEntities(getUsersDto);
  }

  async findOne(id: number) {
    //get from cache
    const user = await this.cacheManager.get<UserEntity>(`user_${id}`); // get from cache if user
    if (!user) {
      // get from db
      const user = await this.userRepository.findOneEntity(id);
      if (!user) {
        throw new NotFoundException(`User with ID = ${id} is not found!`);
      }

      const ttl = convertToMilliseconds(
        this.configService.get<string>('JWT_EXPIRATION'),
      );

      await this.cacheManager.set(`user_${id}`, user, ttl);
      console.log(`User_${id} from database`);
      return user;
    }
    console.log(`User_${id} from cache`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateEntity(id, updateUserDto);
  }

  remove(id: number, user: JwtPayload) {
    if (user.sub !== id && !user.roles.includes(UserRoleEnum.ADMIN)) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }
    return this.userRepository.removeEntity(id);
  }

  getUserWithPasswordByLogin(login: string) {
    return this.userRepository.getUserWithPasswordByLogin(login);
  }

  async isUserExists(login: string) {
    return await this.userRepository.isUserExists(login);
  }
}
