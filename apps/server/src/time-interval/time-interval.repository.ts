import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import { IntervalSequenceNumberEnum } from '@server/reception/enums/interval.sequence.number.enum';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeIntervalRepository extends Repository<TimeIntervalEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TimeIntervalEntity, dataSource.createEntityManager());
  }
  async countTimeIntervals(): Promise<number> {
    return await this.count();
  }

  async getAllTimeIntervals(): Promise<TimeIntervalEntity[]> {
    return await this.find();
  }

  async seed() {
    try {
      if ((await this.countTimeIntervals()) === 0) {
        const timeIntervals: TimeIntervalEntity[] = [];
        Object.keys(IntervalSequenceNumberEnum)
          .filter((enumKey) => isNaN(enumKey as any))
          .forEach((enumKey) => {
            const timeInterval = new TimeIntervalEntity();
            timeInterval.name = enumKey;
            timeIntervals.push(timeInterval);
          });

        await this.save(timeIntervals);
        console.log('timeIntervals seeded!');
        return;
      }
      console.log('timeIntervals already seeded!');
    } catch (error) {
      throw new Error(
        `Something went wrong by seeding timeIntervals: ${error}`,
      );
    }
  }
}
