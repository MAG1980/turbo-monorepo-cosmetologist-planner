import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';
import { ProcedureEnum } from '@server/procedure/enums/Procedure.enum';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProcedureRepository extends Repository<ProcedureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProcedureEntity, dataSource.createEntityManager());
  }
  async seed() {
    try {
      if ((await this.count()) === 0) {
        const procedures: ProcedureEntity[] = [];
        Object.values(ProcedureEnum).forEach((procedureName) => {
          const procedure = new ProcedureEntity();
          procedure.name = procedureName;
          procedure.price = faker.number.int({ min: 100, max: 1000 });
          procedures.push(procedure);
        });

        await this.save(procedures);
        console.log('Procedures seeded!');
        return;
      }
      console.log('Procedures already seeded!');
    } catch (error) {
      throw new Error(`Something went wrong by seeding procedures: ${error}`);
    }
  }
}
