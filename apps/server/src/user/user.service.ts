import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '@server/user/user.repository';
import { SignUpUserDto } from '@server/auth/dto';
import { GetUsersDto, UpdateUserDto } from '@server/user/dto';
import type { JwtPayload } from '@server/auth/interfaces';
import { UserRoleEnum } from '@server/user/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(signUpUserDto: SignUpUserDto) {
    return this.userRepository.createEntity(signUpUserDto);
  }

  findAll(getUsersDto: GetUsersDto) {
    return this.userRepository.findAllEntities(getUsersDto);
  }

  findOne(id: number) {
    return this.userRepository.findOneEntity(id);
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
}
