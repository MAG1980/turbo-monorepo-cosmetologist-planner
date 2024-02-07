import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateEntity } from "./date.entity";
import { IntervalSequenceNumberEnum } from "../enums/interval.sequence.number.enum";

@Entity({ name: 'time_slots' })
export class TimeSlotEntity {
  @PrimaryGeneratedColumn()
  id!: bigint

  @Column({
    type: 'enum',
    enum: IntervalSequenceNumberEnum,
    default: IntervalSequenceNumberEnum['9:00 - 9:30']
  })
  interval!: IntervalSequenceNumberEnum

  @Column()
  available!: boolean

  @ManyToOne(() => DateEntity, (date) => date.timeSlots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'date_id' })
  date!: DateEntity
}