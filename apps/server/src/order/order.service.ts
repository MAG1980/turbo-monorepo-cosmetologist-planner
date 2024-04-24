import { Injectable } from '@nestjs/common';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '@server/order/enums/OrderStatus.enum';
import { ClientService } from '@server/client/client.service';
import { ReceptionService } from '@server/reception/reception.service';
import AppDataSource from '@server/config/dataSource';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly clientService: ClientService,
    private readonly receptionService: ReceptionService,
  ) {}

  async seedOrders(amount: number) {
    const orders: OrderEntity[] = [];
    const clients = await this.clientService.getAllClients();
    let receptions = await this.receptionService.getAvailableReceptions();

    const dataSource = await AppDataSource;

    await dataSource.transaction(async (transactionalEntityManager) => {
      for (let i = 0; i < amount; i++) {
        const order = new OrderEntity();
        order.status = faker.helpers.arrayElement(Object.values(OrderStatus));
        order.clientId = faker.helpers.arrayElement(clients).id;

        const reception = faker.helpers.arrayElement(receptions);

        order.reception = reception;

        await transactionalEntityManager
          .createQueryBuilder()
          .update(ReceptionEntity)
          .set({ available: false })
          .where('date = :date', { date: reception.date })
          .andWhere('timeInterval = :timeInterval', {
            timeInterval: reception.timeInterval,
          })
          .execute();

        receptions = receptions.filter(
          (r) =>
            r.date !== reception.date ||
            r.timeInterval !== reception.timeInterval,
        );
        orders.push(order);
      }
      await transactionalEntityManager.save(orders);
    });
  }
}
