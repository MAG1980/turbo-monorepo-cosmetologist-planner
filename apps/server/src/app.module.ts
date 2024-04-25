import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from '@server/trpc/trpc.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@server/config/dataSource.options';
import { ReceptionModule } from './reception/reception.module';
import { OrderModule } from './order/order.module';
import { ProcedureModule } from './procedure/procedure.module';
import { ClientModule } from './client/client.module';
import { TimeIntervalModule } from '@server/time-interval/time-interval.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dataSourceOptions],
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions(),
    }),
    TrpcModule,
    // UserModule,
    ReceptionModule,
    OrderModule,
    ProcedureModule,
    ClientModule,
    TimeIntervalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// console.log('dataSourceOptions: ', dataSourceOptions())
