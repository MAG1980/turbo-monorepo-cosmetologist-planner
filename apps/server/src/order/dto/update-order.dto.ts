import { PickType } from '@nestjs/swagger';
import { OrderEntity } from '@server/order/entities/Order.entity';

export class UpdateOrderDto extends PickType(OrderEntity, ['status']) {}
