import { Module } from '@nestjs/common';
import { TimeIntervalService } from './time-interval.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import { TimeIntervalController } from './time-interval.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TimeIntervalEntity])],
  providers: [TimeIntervalService],
  exports: [TimeIntervalService],
  controllers: [TimeIntervalController],
})
export class TimeIntervalModule {}
