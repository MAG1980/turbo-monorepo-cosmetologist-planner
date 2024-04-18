import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { ReceptionController } from '@server/reception/reception.controller';
import { ReceptionService } from '@server/reception/reception.service';
import { TimeIntervalModule } from '@server/time-interval/time-interval.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReceptionEntity]), TimeIntervalModule],
  controllers: [ReceptionController],
  providers: [ReceptionService],
})
export class ReceptionModule {}
