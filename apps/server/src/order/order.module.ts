import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { ClientEntity } from '@server/client/entities/Client.entity';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import { OrderRepository } from '@server/order/order.repository';
import { ClientRepository } from '@server/client/client.repository';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';

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
    OrderRepository,
    ClientRepository,
    ProcedureRepository,
    ReceptionRepository,
    TimeIntervalRepository,
  ],
})
export class OrderModule {}
