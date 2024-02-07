import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimeSlotEntity } from "./time.slot.entity";

@Entity({ name: 'dates' })
export class DateEntity {
  @PrimaryGeneratedColumn()
  id!: bigint

  @Column({ type: 'timestamptz', nullable: false, default: () => 'CURRENT_TIMESTAMP()' })
  timestampWithTimezone!: Date

  @Column({ nullable: false })
  available!: boolean

  @OneToMany(() => TimeSlotEntity, (timeSlot) => timeSlot.date, {cascade:true})
  timeSlots!: TimeSlotEntity[]
}