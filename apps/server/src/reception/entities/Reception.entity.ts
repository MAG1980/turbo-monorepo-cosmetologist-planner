import { Column, Entity, PrimaryColumn,  } from "typeorm";
import { IntervalSequenceNumberEnum } from "../enums/interval.sequence.number.enum";

@Entity({name: 'receptions'})
export class ReceptionEntity  {

  @PrimaryColumn({
    primaryKeyConstraintName: 'receptions_time_pkey',
    type:'timestamptz',
    default:()=>'CURRENT_TIMESTAMP()',
  })
  date!: Date

  @PrimaryColumn({
    primaryKeyConstraintName: 'receptions_time_pkey',
    type:'enum',
    enum: IntervalSequenceNumberEnum,
  })
  timeInterval!: IntervalSequenceNumberEnum

  @Column({type:'boolean',default:true})
  available!: boolean
}