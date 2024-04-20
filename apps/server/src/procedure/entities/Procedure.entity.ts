import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ProcedureEnum } from '../enums/Procedure.enum';

@Entity('procedures')
export class ProcedureEntity {
  @PrimaryColumn({
    type: 'enum',
    enum: ProcedureEnum,
    unique: true,
  })
  name!: ProcedureEnum;

  @Column()
  price!: number;
}
