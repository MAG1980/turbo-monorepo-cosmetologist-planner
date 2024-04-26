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
    },
  });
