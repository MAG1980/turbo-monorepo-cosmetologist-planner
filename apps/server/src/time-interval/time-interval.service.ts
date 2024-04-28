import { Injectable } from '@nestjs/common';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';

@Injectable()
export class TimeIntervalService {
  constructor(
    private readonly timeIntervalRepository: TimeIntervalRepository,
  ) {}
  async getAllTimeIntervals(): Promise<TimeIntervalEntity[]> {
    return this.timeIntervalRepository.find();
  }
}
