import { PartialType } from '@nestjs/swagger';
import { SignUpUserDto } from '@server/auth/dto/sign-up-user.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
