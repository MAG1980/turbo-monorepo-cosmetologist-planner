import { Controller, Get } from '@nestjs/common';
import { TimeIntervalService } from '@server/time-interval/time-interval.service';

@Controller('time-interval')
export class TimeIntervalController {
  constructor(private readonly timeIntervalService: TimeIntervalService) {}

  @Get('all')
  async getAllTimeIntervals() {
    return await this.timeIntervalService.getAllTimeIntervals();
  }
}
