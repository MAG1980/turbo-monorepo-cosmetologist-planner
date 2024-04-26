import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@server/order/order.repository';

@Injectable()
export class OrderService {
  getOrdersByClient(id: number) {
    return OrderRepository.getOrdersByClient(id);
  }
}
