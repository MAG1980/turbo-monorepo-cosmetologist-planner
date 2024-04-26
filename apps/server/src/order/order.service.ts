import { Injectable } from '@nestjs/common';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '@server/order/enums/OrderStatus.enum';
import { ClientService } from '@server/client/client.service';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly clientService: ClientService,
    @InjectRepository(ReceptionEntity)
    private readonly receptionRepository: typeof ReceptionRepository,
  ) {}

  async seedOrders(amount: number) {
    const orders: OrderEntity[] = [];
    const clients = await this.clientService.getAllClients();
    let receptions = await this.receptionRepository.getAvailableReceptions();

    for (let i = 0; i < amount; i++) {
      const order = new OrderEntity();
      order.status = faker.helpers.arrayElement(Object.values(OrderStatus));
      order.clientId = faker.helpers.arrayElement(clients).id;

      const reception = faker.helpers.arrayElement(receptions);

      order.reception = reception;

      reception.available = false;
      await this.receptionRepository.updateAvailability(reception);

      receptions = receptions.filter(
        (r) =>
          r.date !== reception.date ||
          r.timeInterval !== reception.timeInterval,
      );
      orders.push(order);
    }
    await this.orderRepository.save(orders);
  }

  getOrdersByClient(id: number) {
    return this.orderRepository.find({
      where: { clientId: id },
      relations: ['reception', 'procedures'],
    });
  }
}
