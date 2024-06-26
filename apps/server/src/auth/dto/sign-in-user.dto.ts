import { PickType } from '@nestjs/swagger';
import { SignUpUserDto } from '@server/auth/dto/sign-up-user.dto';

export class SignInUserDto extends PickType(SignUpUserDto, [
  'email',
  'password',
] as const) {}
