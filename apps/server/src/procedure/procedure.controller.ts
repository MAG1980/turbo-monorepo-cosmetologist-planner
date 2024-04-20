import { Controller, Get, HttpException } from '@nestjs/common';
import { ProcedureService } from '@server/procedure/procedure.service';

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Get('seed')
  async seedProcedures() {
    try {
      await this.procedureService.seedProcedures();
    } catch (error) {
      throw new HttpException(
        `Something went wrong by seeding procedures: ${error}`,
        500,
      );
    }
    return 'Procedures seeded!';
  }
}
