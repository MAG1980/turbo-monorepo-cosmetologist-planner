import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';
import { Repository } from 'typeorm';
import { ProcedureEnum } from '@server/procedure/enums/Procedure.enum';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(ProcedureEntity)
    private readonly procedureRepository: Repository<ProcedureEntity>,
  ) {}

  seedProcedures() {
    const procedures: ProcedureEntity[] = [];
    Object.values(ProcedureEnum).forEach((procedureName) => {
      const procedure = new ProcedureEntity();
      procedure.name = procedureName;
      procedure.price = faker.number.int({ min: 100, max: 1000 });
      procedures.push(procedure);
    });

    return this.procedureRepository.save(procedures);
  }

  getAllProcedures() {
    return this.procedureRepository.find();
  }

  getProcedureById(id: number) {
    return this.procedureRepository.findOneBy({ id });
  }
}
