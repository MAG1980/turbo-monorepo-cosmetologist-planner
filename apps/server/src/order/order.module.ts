import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { ClientEntity } from '@server/client/entities/Client.entity';
import { ClientService } from '@server/client/client.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ClientEntity])],
  controllers: [OrderController],
  providers: [OrderService, ClientService],
})
export class OrderModule {}
