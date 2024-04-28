import { Module } from '@nestjs/common';
import { TimeIntervalService } from './time-interval.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import { TimeIntervalController } from './time-interval.controller';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TimeIntervalEntity])],
  providers: [TimeIntervalService, TimeIntervalRepository],
  exports: [TimeIntervalService],
  controllers: [TimeIntervalController],
})
export class TimeIntervalModule {}
