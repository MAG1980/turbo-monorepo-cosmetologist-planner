import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IntervalSequenceNumberEnum } from '../enums/interval.sequence.number.enum';

@Entity({ name: 'receptions' })
export class ReceptionEntity {
  @PrimaryColumn({
    name: 'date',
    primaryKeyConstraintName: 'receptions_time_pkey',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  date!: Date;

  @PrimaryColumn({
    name: 'time_interval',
    primaryKeyConstraintName: 'receptions_time_pkey',
    type: 'enum',
    enum: IntervalSequenceNumberEnum,
  })
  timeInterval!: IntervalSequenceNumberEnum;

  @Column({ type: 'boolean', default: true })
  available!: boolean;
}
