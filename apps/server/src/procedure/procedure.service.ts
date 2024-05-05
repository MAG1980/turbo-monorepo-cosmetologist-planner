import { Injectable } from '@nestjs/common';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import {
  CreateProcedureDto,
  GetProceduresDto,
  UpdateProcedureDto,
} from '@server/procedure/dto';

@Injectable()
export class ProcedureService {
  constructor(private readonly procedureRepository: ProcedureRepository) {}
  create(createProcedureDto: CreateProcedureDto) {
    return this.procedureRepository.createEntity(createProcedureDto);
  }

  findAll(getProceduresDto: GetProceduresDto) {
    return this.procedureRepository.findAllEntities(getProceduresDto);
  }

  findOne(id: number) {
    return this.procedureRepository.findOneEntity(id);
  }

  update(id: number, updateProcedureDto: UpdateProcedureDto) {
    return this.procedureRepository.updateEntity(id, updateProcedureDto);
  }

  remove(id: number) {
    return this.procedureRepository.removeEntity(id);
  }
}
