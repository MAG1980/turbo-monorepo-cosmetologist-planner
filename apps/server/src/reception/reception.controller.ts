import { Controller, Get } from '@nestjs/common';
import { ReceptionService } from "@server/reception/reception.service";

@Controller('reception')
export class ReceptionController {
  constructor( private readonly receptionService: ReceptionService) {}

  @Get('seed')
  seedReceptions() {
    this.receptionService.seedReceptions()
    return 'Receptions seeded!'
  }
}
