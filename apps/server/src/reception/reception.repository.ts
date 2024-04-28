import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
import moment from 'moment-timezone';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReceptionRepository extends Repository<ReceptionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReceptionEntity, dataSource.createEntityManager());
  }
  async seed(daysAmount = 15, timeIntervalRepository: TimeIntervalRepository) {
    const timeIntervals = await timeIntervalRepository.getAllTimeIntervals();

    const startDate = moment(await this.getLastReceptionDate()) || moment();
    const receptions = [];

    for (let i = 0; i < daysAmount; i++) {
      const date = startDate
        .add(1, 'days')
        .tz('Europe/Moscow')
        .format('YYYY-MM-DD');

      for (const timeInterval of timeIntervals) {
        const reception = new ReceptionEntity();
        reception.date = date;
        reception.timeInterval = timeInterval.id;
        receptions.push(reception);
      }
    }
    try {
      await this.save(receptions);
      console.log('Receptions seeded!');
    } catch (error) {
      throw new Error(`Something went wrong by seeding receptions: ${error}`);
    }
  }

  getAvailableReceptions() {
    return this.find({ where: { available: true } });
  }

  getReceptionsByTimeInterval(timeInterval: number) {
    return this.createQueryBuilder('reception')
      .where(
        'reception.available = true AND reception.timeInterval = :timeInterval',
        { timeInterval },
      )
      .getMany();
  }

  getAvailableReceptionsByDate(date: string) {
    return this.createQueryBuilder('reception')
      .where('reception.date = :date AND reception.available = true', {
        date,
      })
      .getMany();
  }

  getReceptionsByDateAndTimeInterval(date: string, timeInterval: string) {
    console.log(date, timeInterval);
    return this.createQueryBuilder('reception')
      .where(
        'reception.date = :date AND reception.timeInterval = :timeInterval',
        { date: moment(date).format('YYYY-MM-DD'), timeInterval },
      )
      .getOne();
  }

  updateAvailability(reception: ReceptionEntity) {
    return this.createQueryBuilder('reception')
      .update(ReceptionEntity)
      .set({ available: reception.available })
      .where('date = :date', { date: reception.date })
      .andWhere('timeInterval = :timeInterval', {
        timeInterval: reception.timeInterval,
      })
      .execute();
  }

  async getLastReceptionDate() {
    const lastReception: Partial<ReceptionEntity> | undefined =
      await this.createQueryBuilder('reception')
        .select('reception.date as date')
        .orderBy('reception.date', 'DESC')
        .limit(1)
        .getRawOne();
    if (lastReception) {
      return lastReception.date;
    }
  }
}
