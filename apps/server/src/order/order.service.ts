import { Injectable } from '@nestjs/common';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '@server/order/enums/OrderStatus.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async seedOrders(amount: number) {
    const orders: OrderEntity[] = [];

    for (let i = 0; i < amount; i++) {
      const order = new OrderEntity();
      order.status = faker.helpers.arrayElement(Object.values(OrderStatus));
      orders.push(order);
    }
    await this.orderRepository.save(orders);
  }
}
