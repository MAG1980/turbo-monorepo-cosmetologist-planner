import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from '@server/trpc/trpc.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@server/config/dataSource.options';
import { TimeModule } from './time/time.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load:[dataSourceOptions]
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions(),
    }),
    TrpcModule,
    // UserModule,
    TimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// console.log('dataSourceOptions: ', dataSourceOptions())
