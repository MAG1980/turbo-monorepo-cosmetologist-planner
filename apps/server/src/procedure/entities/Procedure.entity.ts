import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('procedures')
export class ProcedureEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  name!: string;

  @Column()
  price!: number;
}
