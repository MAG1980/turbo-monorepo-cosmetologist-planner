import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { OrderService } from '@server/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orders-by-client/:id')
  async getOrdersByClient(@Param('id') id: number) {
    try {
      return await this.orderService.getOrdersByClient(id);
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }
  }
}
