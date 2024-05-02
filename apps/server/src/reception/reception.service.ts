import { Injectable } from '@nestjs/common';
import { ReceptionRepository } from '@server/reception/reception.repository';
import { CreateReceptionDto } from '@server/reception/dto/create-reception.dto';
import { GetReceptionsDto } from '@server/reception/dto/get-receptions.dto';
import { UpdateReceptionDto } from '@server/reception/dto/update-reception.dto';

@Injectable()
export class ReceptionService {
  constructor(public readonly receptionRepository: ReceptionRepository) {}

  create(createReceptionDto: CreateReceptionDto) {
    return this.receptionRepository.createEntity(createReceptionDto);
  }

  findAll(getReceptionsDto: GetReceptionsDto) {
    console.log('getReceptionsDto: ', getReceptionsDto);
    return this.receptionRepository.findAllEntities(getReceptionsDto);
  }

  findOne(date: string, timeInterval: number) {
    return this.receptionRepository.findOneEntity(date, timeInterval);
  }

  update(
    date: string,
    timeInterval: number,
    updateReceptionDto: UpdateReceptionDto,
  ) {
    return this.receptionRepository.updateEntity(
      date,
      timeInterval,
      updateReceptionDto,
    );
  }

  remove(date: string, timeInterval: number) {
    return this.receptionRepository.removeEntity(date, timeInterval);
  }
}
