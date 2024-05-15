import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TokenEntity } from '@server/auth/entities/token.entity';
import { v4 } from 'uuid';
import moment from 'moment-timezone';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@server/user/entities/User.entity';
import { SignInUserDto } from '@server/auth/dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthRepository extends Repository<TokenEntity> {
  constructor(
    datasource: DataSource,
    private readonly jwtService: JwtService,
  ) {
    super(TokenEntity, datasource.createEntityManager());
  }

  isPasswordMatch(signInUserDto: SignInUserDto, user: UserEntity) {
    return compareSync(signInUserDto.password, user.password);
  }
  async getAccessToken(user: UserEntity) {
    return (
      'Bearer ' +
      (await this.jwtService.signAsync({
        //sub субъект JWT – пользователь, который запросил токен, обычно адрес электронной почты.
        sub: user.id,
        login: user.login,
        email: user.email,
        roles: user.roles,
      }))
    );
  }
  async getRefreshToken(userId: number, userAgent: string) {
    const refreshToken = this.create({
      token: v4(),
      expiration: moment().add(30, 'days').format('MM/DD/YYYY'),
      user: { id: userId },
      userAgent,
    });
    const upsert = await this.upsert(refreshToken, ['userId', 'userAgent']);
    console.log({ upsert });
    return refreshToken;
  }

  async isTokenValid(token: string) {
    const tokenEntity = await this.findOne({ where: { token } });
    if (tokenEntity) {
      if (moment().isBefore(tokenEntity.expiration)) {
        return true;
      }
    }
    return false;
  }
}
