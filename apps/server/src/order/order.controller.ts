import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { OrderService } from '@server/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('seed/:amount')
  async seedOrders(@Param('amount') amount: number) {
    try {
      await this.orderService.seedOrders(amount);
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }

    return 'Orders seeded!';
  }
}
