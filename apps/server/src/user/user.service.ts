import { Injectable } from '@nestjs/common';
import { UserRepository } from '@server/user/user.repository';
import { CreateUserDto } from '@server/user/dto/create-user.dto';
import { UpdateUserDto } from '@server/user/dto/update-user.dto';
import { GetUsersDto } from '@server/user/dto/get-users.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.createEntity(createUserDto);
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
