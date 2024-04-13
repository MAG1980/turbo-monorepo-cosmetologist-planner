import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IntervalSequenceNumberEnum } from "../enums/interval.sequence.number.enum";

@Entity({name: 'receptions'})
export class ReceptionEntity  {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({
    type:'timestamptz',
    default:()=>'CURRENT_TIMESTAMP()',
  })
  date!: Date

  @Column({
    type:'enum',
    enum: IntervalSequenceNumberEnum,
  })
  timeInterval!: IntervalSequenceNumberEnum
}