import {
  Body,
  Controller,
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

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orders-by-client/:id')
  async getOrdersByClient(@Param('id', ParseIntPipe) id: number) {
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
  @UsePipes(GetOrdersDtoTransformPipe)
  findAll(@Query() getOrdersDto: GetOrdersDto) {
    console.log('getOrdersDto: ', getOrdersDto);
    return this.orderService.findAll(getOrdersDto);
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
