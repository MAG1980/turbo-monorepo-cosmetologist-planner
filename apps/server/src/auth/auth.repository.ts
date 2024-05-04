import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '@server/auth/dto/auth-credentials.dto';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@server/user/entities/User.entity';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async signIn(authCredentialsDto: AuthCredentialsDto) {
    console.log(authCredentialsDto);
  }
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const user = this.create(authCredentialsDto);
    await this.save(user);
  }
}
