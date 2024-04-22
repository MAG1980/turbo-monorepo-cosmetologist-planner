import { Controller, Get, HttpException, Param } from '@nestjs/common';
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

  @Get('all')
  async getAllProcedures() {
    try {
      return await this.procedureService.getAllProcedures();
    } catch (error) {
      throw new HttpException(
        `Something went wrong by getting procedures: ${error}`,
        500,
      );
    }
  }

  @Get('by-id/:id')
  async getProcedureById(@Param('id') id: number) {
    try {
      return await this.procedureService.getProcedureById(id);
    } catch (error) {
      throw new HttpException(
        `Something went wrong by getting procedure by id: ${error}`,
        500,
      );
    }
  }
}
