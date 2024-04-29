import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@server/client/client.repository';
import { CreateUserDto } from '@server/client/dto/create-user.dto';
import { UpdateUserDto } from '@server/client/dto/update-user.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.clientRepository.createEntity(createUserDto);
  }

  findAll() {
    return this.clientRepository.findAllEntities();
  }

  findOne(id: number) {
    return this.clientRepository.findOneEntity(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.clientRepository.updateEntity(id, updateUserDto);
  }

  remove(id: number) {
    return this.clientRepository.removeEntity(id);
  }
}
