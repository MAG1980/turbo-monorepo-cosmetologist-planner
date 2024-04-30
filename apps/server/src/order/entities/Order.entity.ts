import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReceptionEntity } from '../../reception/entities/Reception.entity';
import { OrderStatus } from '../enums/OrderStatus.enum';
import { ProcedureEntity } from '../../procedure/entities/Procedure.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'client_id' })
  clientId!: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: 'CREATED',
  })
  status!: OrderStatus;

  @OneToOne(() => ReceptionEntity, { cascade: ['update'] })
  @JoinColumn([
    {
      name: 'reception_date',
      referencedColumnName: 'date',
      foreignKeyConstraintName: 'fk_reception_time',
    },
    {
      name: 'reception_time_interval_id',
      referencedColumnName: 'timeInterval',
      foreignKeyConstraintName: 'fk_reception_time',
    },
  ])
  reception!: ReceptionEntity;

  @ManyToMany(() => ProcedureEntity)
  @JoinTable({
    name: 'order_procedure',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_order_procedure',
    },
    inverseJoinColumn: {
      name: 'procedure_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_procedure_order',
    },
  })
  procedures!: ProcedureEntity[];
}
