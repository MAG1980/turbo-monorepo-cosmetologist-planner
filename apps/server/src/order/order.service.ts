import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@server/order/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  getOrdersByClient(id: number) {
    return this.orderRepository.getOrdersByClient(id);
  }
}
