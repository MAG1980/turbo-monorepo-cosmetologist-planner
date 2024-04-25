import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '@server/client/entities/Client.entity';
import { ClientRepository } from '@server/client/client.repository';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: typeof ClientRepository,
  ) {}

  getAllClients() {
    return this.clientRepository.find();
  }
}
