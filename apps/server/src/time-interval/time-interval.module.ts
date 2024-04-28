import { Module } from '@nestjs/common';
import { TimeIntervalService } from './time-interval.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import { TimeIntervalController } from './time-interval.controller';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TimeIntervalEntity])],
  exports: [TimeIntervalRepository],
  providers: [TimeIntervalService, TimeIntervalRepository],
  controllers: [TimeIntervalController],
})
export class TimeIntervalModule {}
