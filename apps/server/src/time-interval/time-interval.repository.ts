import { TimeIntervalEntity } from '@server/time-interval/entities/TimeInterval.entity';
import dataSource from '@server/config/dataSource';
import { IntervalSequenceNumberEnum } from '@server/reception/enums/interval.sequence.number.enum';

export const TimeIntervalRepository = dataSource
  .getRepository(TimeIntervalEntity)
  .extend({
    async countTimeIntervals(): Promise<number> {
      return await this.count();
    },

    async getAllTimeIntervals(): Promise<TimeIntervalEntity[]> {
      return await this.find();
    },

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

      await this.save(timeIntervals);
    },
  });
