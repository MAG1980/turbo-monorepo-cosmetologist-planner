import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from '@server/order/order.service';
import { CreateOrderDto } from '@server/order/dto/create-order.dto';
import { UpdateOrderDto } from '@server/order/dto/update-order.dto';

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

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
