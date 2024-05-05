import { ProcedureEntity } from '@server/procedure/entities/Procedure.entity';
import { ProcedureEnum } from '@server/procedure/enums/Procedure.enum';
import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  CreateProcedureDto,
  GetProceduresDto,
  UpdateProcedureDto,
} from '@server/procedure/dto';

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

  createEntity(createProcedureDto: CreateProcedureDto) {
    const entity = this.create(createProcedureDto);
    return this.save(entity);
  }

  findAllEntities(getProceduresDto: GetProceduresDto = {}) {
    const { search, sortingParameter, sortingOrder } = getProceduresDto;
    console.log(typeof sortingOrder);
    const queryBuilder = this.createQueryBuilder('procedure');
    if (search) {
      queryBuilder.andWhere('procedure.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    return queryBuilder
      .orderBy(sortingParameter || 'id', sortingOrder || 'ASC')
      .getMany();
  }

  async findOneEntity(id: number) {
    const entity = await this.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Procedure with ID = ${id} is not found!`);
    }
    return entity;
  }

  updateEntity(id: number, updateProcedureDto: UpdateProcedureDto) {
    return this.update(id, updateProcedureDto);
  }

  removeEntity(id: number) {
    return this.delete(id);
  }
}
