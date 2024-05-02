import { Injectable } from '@nestjs/common';
import { ProcedureRepository } from '@server/procedure/procedure.repository';
import { CreateProcedureDto } from '@server/procedure/dto/create-procedure.dto';
import { GetProceduresDto } from '@server/procedure/dto/get-procedures.dto';
import { UpdateProcedureDto } from '@server/procedure/dto/update-procedure.dto';

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
