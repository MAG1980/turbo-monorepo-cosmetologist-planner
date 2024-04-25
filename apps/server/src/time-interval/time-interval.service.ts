import { Injectable } from '@nestjs/common';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TimeIntervalService {
  constructor(
    @InjectRepository(TimeIntervalEntity)
    private readonly timeIntervalRepository: typeof TimeIntervalRepository,
  ) {}

  async getAllTimeIntervals(): Promise<TimeIntervalEntity[]> {
    return TimeIntervalRepository.find();
  }
}
