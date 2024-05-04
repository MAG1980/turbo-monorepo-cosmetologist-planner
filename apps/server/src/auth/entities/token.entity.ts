import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '@server/user/entities/User.entity';

@Entity('tokens')
export class TokenEntity {
  @PrimaryColumn()
  token!: string;

  @Column({ type: 'timestamptz' })
  expiration!: Date;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @Column({ name: 'user_id', type: 'bigint' })
  user!: UserEntity;
}
