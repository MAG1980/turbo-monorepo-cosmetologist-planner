import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from "@server/trpc/trpc.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(),
    TrpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
