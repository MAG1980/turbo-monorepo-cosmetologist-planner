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
import { ReceptionService } from '@server/reception/reception.service';
import { GetReceptionsDto } from '@server/reception/dto/get-receptions.dto';
import { CreateReceptionDto } from '@server/reception/dto/create-reception.dto';
import { UpdateReceptionDto } from '@server/reception/dto/update-reception.dto';

@Controller('receptions')
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

  @Post()
  create(@Body() createReceptionDto: CreateReceptionDto) {
    return this.receptionService.create(createReceptionDto);
  }

  @Get()
  findAll(@Query() getReceptionsDto: GetReceptionsDto) {
    console.log('getReceptionsDto: ', getReceptionsDto);
    return this.receptionService.findAll(getReceptionsDto);
  }

  @Get(':date/:timeInterval')
  findOne(
    @Param('date') date: string,
    @Param('timeInterval', ParseIntPipe) timeInterval: number,
  ) {
    return this.receptionService.findOne(date, timeInterval);
  }

  @Patch(':date/:timeInterval')
  update(
    @Param('date') date: string,
    @Param('timeInterval', ParseIntPipe) timeInterval: number,
    @Body() updateReceptionDto: UpdateReceptionDto,
  ) {
    return this.receptionService.update(date, timeInterval, updateReceptionDto);
  }

  @Delete(':date/:timeInterval')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('date') date: string,
    @Param('timeInterval', ParseIntPipe) timeInterval: number,
  ) {
    return this.receptionService.remove(date, timeInterval);
  }
}
