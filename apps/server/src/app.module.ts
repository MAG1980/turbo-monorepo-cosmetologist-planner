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
import { UserModule } from './user/user.module';
import { TimeIntervalModule } from '@server/time-interval/time-interval.module';
import { SeederModule } from '@server/helpers/seeder/seeder.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@server/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    UserModule,
    TimeIntervalModule,
    SeederModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
// console.log('dataSourceOptions: ', dataSourceOptions())
