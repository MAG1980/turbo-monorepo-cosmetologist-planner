import dataSource from '@server/config/dataSource';
import { ClientEntity } from '@server/client/entities/Client.entity';
import { faker } from '@faker-js/faker/locale/ru';

export const ClientRepository = dataSource.getRepository(ClientEntity).extend({
  async seed(clientsAmount: number) {
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
  },

  getAllClients() {
    return this.find();
  },
});
