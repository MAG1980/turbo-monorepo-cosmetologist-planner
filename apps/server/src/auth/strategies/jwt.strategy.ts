import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@server/auth/interfaces';
import { UserService } from '@server/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const userId = payload.sub;
    const user = await this.userService.findOne(userId).catch((error) => {
      this.logger.error(error);
      return null;
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
