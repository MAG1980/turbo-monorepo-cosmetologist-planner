import { ClientEntity } from '@server/client/entities/Client.entity';
import { faker } from '@faker-js/faker/locale/ru';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '@server/client/dto/create-client.dto';
import { UpdateClientDto } from '@server/client/dto/update-client.dto';
import { GetClientsDto } from '@server/client/dto/get-clients.dto';

@Injectable()
export class ClientRepository extends Repository<ClientEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ClientEntity, dataSource.createEntityManager());
  }
  async seed(clientsAmount: number = 5) {
    const clients: ClientEntity[] = [];

    try {
      for (let i = 0; i < clientsAmount; i++) {
        const client = new ClientEntity();
        client.login = faker.internet.userName();
        client.name = faker.person.fullName();
        client.email = faker.internet.email();
        client.phone = faker.phone.number();
        clients.push(client);
      }

      await this.save(clients);
      console.log('Clients seeded!');
    } catch (error) {
      throw new Error(`Something went wrong by seeding clients: ${error}`);
    }
  }

  createEntity(createClientDto: CreateClientDto) {
    const entity = this.create(createClientDto);
    return this.save(entity);
  }

  findAllEntities(getClientsDto: GetClientsDto = {}) {
    const { search, email, phone } = getClientsDto;
    const queryBuilder = this.createQueryBuilder('client');
    if (search) {
      queryBuilder.andWhere(
        'client.name ILIKE :search OR client.login ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }
    if (email) {
      queryBuilder.andWhere('client.email = :email', { email });
    }
    if (phone) {
      queryBuilder.andWhere('client.phone = :phone', { phone });
    }

    return queryBuilder.getMany();
  }

  findOneEntity(id: number) {
    return this.findOne({ where: { id } });
  }

  updateEntity(id: number, updateClientDto: UpdateClientDto) {
    return this.update(id, updateClientDto);
  }

  removeEntity(id: number) {
    return this.delete(id);
  }
}
