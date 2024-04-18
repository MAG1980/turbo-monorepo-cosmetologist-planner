import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment-timezone';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { TimeIntervalService } from '@server/time-interval/time-interval.service';

@Injectable()
export class ReceptionService {
  constructor(
    @InjectRepository(ReceptionEntity)
    private readonly receptionRepository: Repository<ReceptionEntity>,
    private readonly timeIntervalService: TimeIntervalService,
  ) {}

  async seedReceptions() {
    if ((await this.timeIntervalService.countTimeIntervals()) === 0) {
      await this.timeIntervalService.seedTimeIntervals();
      console.log('timeIntervals seeded!');
    } else {
      console.log('timeIntervals already seeded!');
    }

    const timeIntervals = await this.timeIntervalService.getAllTimeIntervals();

    const receptions = [];
    const today = moment();
    for (let i = 0; i < 3; i++) {
      const date = today
        .add(i, 'days')
        .tz('Europe/Moscow')
        .format('YYYY-MM-DD');
      console.log(date);
      for (const timeInterval of timeIntervals) {
        const reception = new ReceptionEntity();
        reception.date = date;
        reception.timeInterval = timeInterval.id;
        receptions.push(reception);
      }
    }

    return this.receptionRepository.save(receptions);
  }

  getReceptionsByTimeInterval(timeInterval: string) {
    return this.receptionRepository
      .createQueryBuilder('reception')
      .where(
        'reception.available = true AND reception.timeInterval = :timeInterval',
        { timeInterval },
      )
      .getMany();
  }
}
