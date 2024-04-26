import { Injectable } from '@nestjs/common';
import { ProcedureRepository } from '@server/procedure/procedure.repository';

@Injectable()
export class ProcedureService {
  getAllProcedures() {
    return ProcedureRepository.find();
  }

  getProcedureById(id: number) {
    return ProcedureRepository.findOneBy({ id });
  }
}
