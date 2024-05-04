import { Injectable } from '@nestjs/common';
import { UserRepository } from '@server/user/user.repository';
import { UpdateUserDto } from '@server/user/dto/update-user.dto';
import { GetUsersDto } from '@server/user/dto/get-users.dto';
import { SignUpUserDto } from '@server/auth/dto/sign-up-user.dto';

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

  remove(id: number) {
    return this.userRepository.removeEntity(id);
  }
}
