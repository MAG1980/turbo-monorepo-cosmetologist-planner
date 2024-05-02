import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@server/client/client.repository';
import { CreateClientDto } from '@server/client/dto/create-client.dto';
import { UpdateClientDto } from '@server/client/dto/update-client.dto';
import { GetClientsDto } from '@server/client/dto/get-clients.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.createEntity(createClientDto);
  }

  findAll(getClientsDto: GetClientsDto) {
    return this.clientRepository.findAllEntities(getClientsDto);
  }

  findOne(id: number) {
    return this.clientRepository.findOneEntity(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.updateEntity(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientRepository.removeEntity(id);
  }
}
