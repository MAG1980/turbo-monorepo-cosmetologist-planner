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
import { AuthenticationProvidersEnum } from '../../common/enums';
import { getRandomPassword } from '../../common/helpers';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
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

  @Column({ default: 'password', select: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: AuthenticationProvidersEnum,
    default: AuthenticationProvidersEnum.LOCAL,
  })
  provider!: AuthenticationProvidersEnum;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, genSaltSync(10));
      return;
    }
    this.password = await getRandomPassword();
  }
}
