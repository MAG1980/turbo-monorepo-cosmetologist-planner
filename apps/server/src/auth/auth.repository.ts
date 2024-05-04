import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@server/user/entities/User.entity';
import { SignInUserDto } from '@server/auth/dto/sign-in-user.dto';
import { SignUpUserDto } from '@server/auth/dto/sign-up-user.dto';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async signIn(signInUserDto: SignInUserDto) {
    console.log(signInUserDto);
  }
  async signUp(signUpUserDto: SignUpUserDto) {
    const user = this.create(signUpUserDto);
    await this.save(user);
  }
}
