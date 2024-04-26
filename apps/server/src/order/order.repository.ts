import dataSource from '@server/config/dataSource';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '@server/order/enums/OrderStatus.enum';
import { ClientRepository } from '@server/client/client.repository';
import { ReceptionRepository } from '@server/reception/reception.repository';

export const OrderRepository = dataSource.getRepository(OrderEntity).extend({
  async seed(ordersAmount: number = 1) {
    try {
      const orders: OrderEntity[] = [];
      const clients = await ClientRepository.getAllClients();
      let receptions = await ReceptionRepository.getAvailableReceptions();

      for (let i = 0; i < ordersAmount; i++) {
        const order = new OrderEntity();
        order.status = faker.helpers.arrayElement(Object.values(OrderStatus));
        order.clientId = faker.helpers.arrayElement(clients).id;

        const reception = faker.helpers.arrayElement(receptions);
        order.reception = reception;
        reception.available = false;
        await ReceptionRepository.updateAvailability(reception);

        receptions = receptions.filter(
          (r) =>
            r.date !== reception.date ||
            r.timeInterval !== reception.timeInterval,
        );

        orders.push(order);
      }
      await this.save(orders);
      console.log('Orders seeded!');
    } catch (error) {
      console.log('Something went wrong by seeding orders: ', error);
    }
  },

  getOrdersByClient(id: number) {
    return this.find({
      where: { clientId: id },
      relations: ['reception', 'procedures'],
    });
  },
});
