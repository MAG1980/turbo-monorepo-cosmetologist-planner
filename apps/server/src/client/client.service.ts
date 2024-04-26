import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@server/client/client.repository';

@Injectable()
export class ClientService {
  getAllClients() {
    return ClientRepository.find();
  }
}
