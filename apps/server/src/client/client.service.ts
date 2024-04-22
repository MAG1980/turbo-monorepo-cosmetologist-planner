import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '@server/client/entities/Client.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker/locale/ru';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  seedClients(amount: string) {
    const clients: ClientEntity[] = [];

    for (let i = 0; i < parseInt(amount); i++) {
      const client = new ClientEntity();
      client.login = faker.internet.userName();
      client.name = faker.person.fullName();
      client.email = faker.internet.email();
      client.phone = faker.phone.number();
      clients.push(client);
    }
    return this.clientRepository.save(clients);
  }

  getAllClients() {
    return this.clientRepository.find();
  }
}
