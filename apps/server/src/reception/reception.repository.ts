import { ReceptionEntity } from '@server/reception/entities/Reception.entity';
import { TimeIntervalRepository } from '@server/time-interval/time-interval.repository';
import moment from 'moment-timezone';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateReceptionDto } from '@server/reception/dto/create-reception.dto';
import { GetReceptionsDto } from '@server/reception/dto/get-receptions.dto';
import { UpdateReceptionDto } from '@server/reception/dto/update-reception.dto';

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

  createEntity(createReceptionDto: CreateReceptionDto) {
    const { date, timeInterval, available } = createReceptionDto;
    return this.createQueryBuilder('reception')
      .insert()
      .into(ReceptionEntity)
      .values({
        date: moment(date).format('YYYY-MM-DD'),
        timeInterval,
        available,
      })
      .execute();
  }

  findAllEntities(getReceptionsDto: GetReceptionsDto) {
    const { date, timeInterval, available } = getReceptionsDto;
    console.log('getReceptionsDto: ', getReceptionsDto);

    const queryBuilder = this.createQueryBuilder('reception');
    if (date) {
      queryBuilder.andWhere('reception.date = :date', { date });
    }
    if (timeInterval) {
      queryBuilder.andWhere('reception.timeInterval = :timeInterval', {
        timeInterval,
      });
    }
    if (available) {
      queryBuilder.andWhere('reception.available = :available', {
        available,
      });
    }

    return queryBuilder.getMany();
  }

  async findOneEntity(date: string, timeInterval: number) {
    const reception = await this.findOne({
      where: { date: moment(date).format('YYYY-MM-DD'), timeInterval },
    });
    if (!reception) {
      throw new NotFoundException('Reception not found');
    }
    return reception;
  }

  updateEntity(
    date: string,
    timeInterval: number,
    updateReceptionDto: UpdateReceptionDto,
  ) {
    const { available } = updateReceptionDto;
    return this.createQueryBuilder('reception')
      .update(ReceptionEntity)
      .set({ available })
      .where({ date: moment(date).format('YYYY-MM-DD') })
      .andWhere({ timeInterval })
      .execute();
  }

  removeEntity(date: string, timeInterval: number) {
    return this.createQueryBuilder()
      .delete()
      .from(ReceptionEntity)
      .where('date = :date', { date: moment(date).format('YYYY-MM-DD') })
      .andWhere('timeInterval = :timeInterval', { timeInterval })
      .execute();
  }
}
