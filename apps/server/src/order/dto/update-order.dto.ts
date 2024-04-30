import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from '@server/order/dto/create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
