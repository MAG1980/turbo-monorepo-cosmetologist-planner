import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ReceptionService } from '@server/reception/reception.service';

@Controller('reception')
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

  @Get('seed')
  async seedReceptions() {
    try {
      await this.receptionService.seedReceptions();
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }

    return 'Receptions seeded!';
  }

  @Get('by-time-interval/:timeInterval')
  getReceptionsByTimeInterval(@Param('timeInterval') timeInterval: string) {
    return this.receptionService.getReceptionsByTimeInterval(timeInterval);
  }

  @Get('by-date/:date')
  getAvailableReceptionsByDate(@Param('date') date: string) {
    return this.receptionService.getAvailableReceptionsByDate(date);
  }

  @Get('by-date-and-time/:date/:time')
  getReceptionsByDateAndTimeInterval(
    @Param('date') date: string,
    @Param('time') timeInterval: string,
  ) {
    return this.receptionService.getReceptionsByDateAndTimeInterval(
      date,
      timeInterval,
    );
  }
}
