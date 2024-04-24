import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { ClientEntity } from '@server/client/entities/Client.entity';
import { ClientService } from '@server/client/client.service';
import { ReceptionService } from '@server/reception/reception.service';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import { TimeIntervalService } from '@server/time-interval/time-interval.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      ClientEntity,
      ReceptionEntity,
      TimeIntervalEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    ClientService,
    ReceptionService,
    TimeIntervalService,
  ],
})
export class OrderModule {}
