import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@server/client/entities/Client.entity';
import { ClientRepository } from '@server/client/client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientService, ClientRepository],
  controllers: [ClientController],
})
export class ClientModule {}
