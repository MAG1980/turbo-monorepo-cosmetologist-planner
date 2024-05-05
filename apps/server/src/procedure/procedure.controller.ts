import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProcedureService } from '@server/procedure/procedure.service';
import {
  CreateProcedureDto,
  GetProceduresDto,
  UpdateProcedureDto,
} from '@server/procedure/dto';

@Controller('procedures')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Post()
  create(@Body() createProcedureDto: CreateProcedureDto) {
    return this.procedureService.create(createProcedureDto);
  }

  @Get()
  findAll(@Query() getProceduresDto: GetProceduresDto) {
    return this.procedureService.findAll(getProceduresDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.procedureService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcedureDto: UpdateProcedureDto,
  ) {
    return this.procedureService.update(id, updateProcedureDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.procedureService.remove(id);
  }
}
