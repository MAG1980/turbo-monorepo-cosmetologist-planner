import { Injectable } from '@nestjs/common';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '@server/order/enums/OrderStatus.enum';
import { ClientService } from '@server/client/client.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly clientService: ClientService,
  ) {}

  async seedOrders(amount: number) {
    const orders: OrderEntity[] = [];

    const clients = await this.clientService.getAllClients();

    for (let i = 0; i < amount; i++) {
      const order = new OrderEntity();
      order.status = faker.helpers.arrayElement(Object.values(OrderStatus));
      order.clientId = faker.helpers.arrayElement(clients).id;
      orders.push(order);
    }
    await this.orderRepository.save(orders);
  }
}
