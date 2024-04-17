import { Controller, Get, HttpException } from '@nestjs/common';
import { ReceptionService } from '@server/reception/reception.service';

@Controller('reception')
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

  @Get('seed')
  async seedReceptions() {
    try {
      const seededReceptions = await this.receptionService.seedReceptions();
      console.log(seededReceptions);
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }

    return 'Receptions seeded!';
  }
}
