import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { OrderRepository } from '@server/order/order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  exports: [OrderRepository],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
