import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment-timezone';
import { ReceptionEntity } from '@server/reception/entities/Reception.entity';

@Injectable()
export class ReceptionService {
  constructor(
    @InjectRepository(ReceptionEntity)
    private readonly receptionRepository: Repository<ReceptionEntity>,
  ) {}

  seedReceptions() {
    const receptions = [];
    const today = moment();
    for (let i = 0; i < 3; i++) {
      const date = today
        .add(i, 'days')
        .tz('Europe/Moscow')
        .format('YYYY-MM-DD');
      console.log(date);
      for (let j = 0; j < 16; j++) {
        const reception = new ReceptionEntity();
        reception.date = date;
        reception.timeInterval = j;
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
