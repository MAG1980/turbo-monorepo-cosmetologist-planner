import { Module } from '@nestjs/common';
import { ClientModule } from '@server/client/client.module';
import { OrderModule } from '@server/order/order.module';
import { ProcedureModule } from '@server/procedure/procedure.module';
import { ReceptionModule } from '@server/reception/reception.module';
import { TimeIntervalModule } from '@server/time-interval/time-interval.module';
import { SeederService } from '@server/helpers/seeder/seeder.service';

@Module({
  imports: [
    ClientModule,
    OrderModule,
    ProcedureModule,
    ReceptionModule,
    TimeIntervalModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
