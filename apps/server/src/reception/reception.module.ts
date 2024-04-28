import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { ReceptionController } from '@server/reception/reception.controller';
import { ReceptionService } from '@server/reception/reception.service';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReceptionEntity])],
  controllers: [ReceptionController],
  providers: [ReceptionService, ReceptionRepository, TimeIntervalRepository],
})
export class ReceptionModule {}
