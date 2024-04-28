import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@server/client/client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}
  getAllClients() {
    return this.clientRepository.getAllClients();
  }
}
