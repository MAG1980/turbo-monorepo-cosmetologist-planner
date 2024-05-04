import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TokenEntity } from '@server/auth/entities/token.entity';
import { OrderEntity } from '@server/order/entities/Order.entity';
import { UserRoleEnum } from '@server/user/enums/user-role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  login!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  phone!: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders!: OrderEntity[];

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens!: TokenEntity[];

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  roles!: UserRoleEnum;
}
