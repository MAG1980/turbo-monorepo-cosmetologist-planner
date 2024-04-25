import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';
import { ProcedureRepository } from '@server/procedure/procedure.repository';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(ProcedureEntity)
    private readonly procedureRepository: typeof ProcedureRepository,
  ) {}

  getAllProcedures() {
    return this.procedureRepository.find();
  }

  getProcedureById(id: number) {
    return this.procedureRepository.findOneBy({ id });
  }
}
