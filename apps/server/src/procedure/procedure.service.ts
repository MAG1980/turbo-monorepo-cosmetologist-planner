import { Injectable } from '@nestjs/common';
import { ProcedureRepository } from '@server/procedure/procedure.repository';

@Injectable()
export class ProcedureService {
  constructor(private readonly procedureRepository: ProcedureRepository) {}
  getAllProcedures() {
    return this.procedureRepository.find();
  }

  getProcedureById(id: number) {
    return this.procedureRepository.findOneBy({ id });
  }
}
