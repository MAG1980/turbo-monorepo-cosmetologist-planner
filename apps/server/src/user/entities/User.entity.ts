import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenEntity } from '../../auth/entities/token.entity';
import { OrderEntity } from '../../order/entities/Order.entity';
import { UserRoleEnum } from '../../user/enums/user-role.enum';
import { genSaltSync, hashSync } from 'bcrypt';

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

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    array: true,
    default: [UserRoleEnum.USER],
  })
  roles!: UserRoleEnum[];

  @Column({ default: 'password' })
  password!: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, genSaltSync(10));
  }
}
