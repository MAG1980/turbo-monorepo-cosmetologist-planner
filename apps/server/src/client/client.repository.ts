import dataSource from '@server/config/dataSource';
import { ClientEntity } from '@server/client/entities/Client.entity';
import { faker } from '@faker-js/faker/locale/ru';

export const ClientRepository = dataSource.getRepository(ClientEntity).extend({
  async seed(amount: number) {
    const clients: ClientEntity[] = [];

    try {
      for (let i = 0; i < amount; i++) {
        const client = new ClientEntity();
        client.login = faker.internet.userName();
        client.name = faker.person.fullName();
        client.email = faker.internet.email();
        client.phone = faker.phone.number();
        clients.push(client);
      }

      console.log('Clients seeded:', await this.save(clients));
    } catch (error) {
      throw new Error(`Something went wrong by seeding clients: ${error}`);
    }
  },
});
