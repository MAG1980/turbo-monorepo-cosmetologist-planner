import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { OrderService } from '@server/order/order.service';
import { CreateOrderDto } from '@server/order/dto/create-order.dto';
import { UpdateOrderDto } from '@server/order/dto/update-order.dto';
import { GetOrdersDto } from '@server/order/dto/get-orders.dto';
import { GetOrdersDtoTransformPipe } from '@server/order/pipes/getOrdersDtoTransform.pipe';
import { config } from 'dotenv';
import * as process from 'node:process';

config({ path: '../../.env' });

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orders-by-user/:id')
  async getOrdersByUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.orderService.getOrdersByUser(id);
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UsePipes(GetOrdersDtoTransformPipe)
  findAll(
    @Query() getOrdersDto: GetOrdersDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    console.log('getOrdersDto: ', getOrdersDto);
    const route = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}/orders`;
    return this.orderService.findAll(getOrdersDto, { page, limit, route });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
