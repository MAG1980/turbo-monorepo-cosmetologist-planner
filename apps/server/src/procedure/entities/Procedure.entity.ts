import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from '../../order/entities/Order.entity';

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

  @ManyToMany(() => OrderEntity)
  orders!: OrderEntity[];
}
