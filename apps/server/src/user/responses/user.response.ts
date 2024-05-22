import { UserEntity } from '@server/user/entities/User.entity';
import { Exclude } from 'class-transformer';

export class UserResponse extends UserEntity {
  @Exclude()
  password!: string;

  @Exclude()
  isActive!: boolean;

  constructor(user: UserEntity) {
    super();
    Object.assign(this, user);
  }
}
