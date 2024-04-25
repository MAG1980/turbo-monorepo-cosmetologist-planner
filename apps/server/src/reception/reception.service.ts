import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment-timezone';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
@Injectable()
export class ReceptionService {
  constructor(
    @InjectRepository(ReceptionEntity)
    private readonly receptionRepository: Repository<ReceptionEntity>,
  ) {}

  async seedReceptions() {
    if ((await TimeIntervalRepository.countTimeIntervals()) === 0) {
      await TimeIntervalRepository.seed();
      console.log('timeIntervals seeded!');
    } else {
      console.log('timeIntervals already seeded!');
    }

    const timeIntervals = await TimeIntervalRepository.getAllTimeIntervals();

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

  getAvailableReceptions() {
    return this.receptionRepository.find({ where: { available: true } });
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

  getAvailableReceptionsByDate(date: string) {
    return this.receptionRepository
      .createQueryBuilder('reception')
      .where('reception.date = :date AND reception.available = true', { date })
      .getMany();
  }

  getReceptionsByDateAndTimeInterval(date: string, timeInterval: string) {
    console.log(date, timeInterval);
    return this.receptionRepository
      .createQueryBuilder('reception')
      .where(
        'reception.date = :date AND reception.timeInterval = :timeInterval',
        { date: moment(date).format('YYYY-MM-DD'), timeInterval },
      )
      .getOne();
  }

  updateAvailability(reception: ReceptionEntity) {
    return this.receptionRepository
      .createQueryBuilder('reception')
      .update(ReceptionEntity)
      .set({ available: reception.available })
      .where('date = :date', { date: reception.date })
      .andWhere('timeInterval = :timeInterval', {
        timeInterval: reception.timeInterval,
      })
      .execute();
  }
}
