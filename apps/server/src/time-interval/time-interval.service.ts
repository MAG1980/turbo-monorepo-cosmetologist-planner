import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntervalSequenceNumberEnum } from '@server/reception/enums/interval.sequence.number.enum';
import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';

@Injectable()
export class TimeIntervalService {
  constructor(
    @InjectRepository(TimeIntervalEntity)
    private readonly timeIntervalRepository: Repository<TimeIntervalEntity>,
  ) {}

  async seedTimeIntervals() {
    const timeIntervals: TimeIntervalEntity[] = [];
    Object.keys(IntervalSequenceNumberEnum)
      .filter((enumKey) => isNaN(enumKey as any))
      .forEach((enumKey) => {
        console.log('enumKey ', enumKey);
        const timeInterval = new TimeIntervalEntity();
        timeInterval.name = enumKey;
        timeIntervals.push(timeInterval);
      });

    await this.timeIntervalRepository.save(timeIntervals);
  }

  async countTimeIntervals() {
    return await this.timeIntervalRepository.count();
  }

  async getAllTimeIntervals() {
    return await this.timeIntervalRepository.find();
  }
}
