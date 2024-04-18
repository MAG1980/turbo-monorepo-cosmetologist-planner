import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReceptionEntity } from '../../reception/entities/Reception.entity';

@Entity('time_intervals')
export class TimeIntervalEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => ReceptionEntity, (reception) => reception.timeInterval)
  receptions!: ReceptionEntity[];
}
