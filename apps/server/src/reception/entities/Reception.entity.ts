import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TimeIntervalEntity } from '../../time-interval/entities/TimeInterval.entity';

@Entity({ name: 'receptions' })
export class ReceptionEntity {
  @PrimaryColumn({
    name: 'date',
    type: 'date',
    primaryKeyConstraintName: 'receptions_time_pkey',
  })
  date!: Date;

  @ManyToOne(() => TimeIntervalEntity, (timeInterval) => timeInterval.id)
  @PrimaryColumn({
    name: 'time_interval_id',
    type: 'integer',
    primaryKeyConstraintName: 'receptions_time_pkey',
  })
  @JoinColumn({
    name: 'time_interval_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_time_interval_id',
  })
  // timeInterval!: TimeIntervalEntity;
  timeInterval!: number;

  @Column({ type: 'boolean', default: true })
  available!: boolean;
}
