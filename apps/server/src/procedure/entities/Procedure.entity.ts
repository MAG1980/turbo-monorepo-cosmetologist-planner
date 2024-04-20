import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProcedureEnum } from '../enums/Procedure.enum';

@Entity('procedures')
export class ProcedureEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: ProcedureEnum,
    unique: true,
  })
  name!: ProcedureEnum;

  @Column()
  price!: number;
}
