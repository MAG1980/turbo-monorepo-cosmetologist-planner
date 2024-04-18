import { Module } from '@nestjs/common';
import { TimeIntervalService } from './time-interval.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeIntervalEntity])],
  providers: [TimeIntervalService],
  exports: [TimeIntervalService],
})
export class TimeIntervalModule {}
