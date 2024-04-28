import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { ReceptionController } from '@server/reception/reception.controller';
import { ReceptionService } from '@server/reception/reception.service';
import { ReceptionRepository } from '@server/reception/reception.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReceptionEntity])],
  exports: [ReceptionRepository],
  controllers: [ReceptionController],
  providers: [ReceptionService, ReceptionRepository],
})
export class ReceptionModule {}
