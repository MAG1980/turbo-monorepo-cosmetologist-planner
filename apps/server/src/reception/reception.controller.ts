import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ReceptionService } from '@server/reception/reception.service';

@Controller('reception')
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

  @Get('by-time-interval/:timeInterval')
  async getReceptionsByTimeInterval(
    @Param('timeInterval') timeInterval: number,
  ) {
    try {
      return await this.receptionService.getReceptionsByTimeInterval(
        timeInterval,
      );
    } catch (error) {
      throw new NotFoundException(
        'No receptions were found for the specified time interval.',
      );
    }
  }

  @Get('by-date/:date')
  async getAvailableReceptionsByDate(@Param('date') date: string) {
    try {
      return await this.receptionService.getAvailableReceptionsByDate(date);
    } catch (error) {
      throw new NotFoundException(`Receptions for ${date} not found`);
    }
  }

  @Get('by-date-and-time/:date/:time')
  async getReceptionsByDateAndTimeInterval(
    @Param('date') date: string,
    @Param('time') timeInterval: string,
  ) {
    try {
      return await this.receptionService.getReceptionsByDateAndTimeInterval(
        date,
        timeInterval,
      );
    } catch (error) {
      throw new NotFoundException(
        `Receptions for ${date} and ${timeInterval} not found`,
      );
    }
  }
}
