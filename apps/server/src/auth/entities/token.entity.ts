import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../user/entities/User.entity';

@Entity('tokens')
@Unique('UQ_tokens_userId_userAgent', ['userId', 'userAgent'])
export class TokenEntity {
  @PrimaryColumn()
  token!: string;

  @Column({ type: 'timestamptz' })
  expiration!: Date;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_tokens_user_id',
  })
  user!: UserEntity;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'user_agent' })
  userAgent!: string;
}
