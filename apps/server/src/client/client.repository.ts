import { ClientEntity } from '@server/client/entities/Client.entity';
import { faker } from '@faker-js/faker/locale/ru';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@server/client/dto/create-user.dto';
import { UpdateUserDto } from '@server/client/dto/update-user.dto';

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

  createEntity(createUserDto: CreateUserDto) {
    const entity = this.create(createUserDto);
    return this.save(entity);
  }

  findAllEntities() {
    return this.find();
  }

  findOneEntity(id: number) {
    return this.findOne({ where: { id } });
  }

  updateEntity(id: number, updateUserDto: UpdateUserDto) {
    return this.update(id, updateUserDto);
  }

  removeEntity(id: number) {
    return this.delete(id);
  }
}
