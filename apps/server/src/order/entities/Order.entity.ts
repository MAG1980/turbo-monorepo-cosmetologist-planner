import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReceptionEntity } from '../../reception/entities/Reception.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'client_id' })
  clientId!: number;

  @Column({ name: 'service_id' })
  serviceId!: number;

  @OneToOne(() => ReceptionEntity)
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
}
