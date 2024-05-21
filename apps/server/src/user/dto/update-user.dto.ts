import { PartialType } from '@nestjs/swagger';
import { SignUpUserDto } from '@server/auth/dto/sign-up-user.dto';
import { AuthenticationProvidersEnum } from '@server/common/enums';

export class UpdateUserDto extends PartialType(SignUpUserDto) {
  provider?: AuthenticationProvidersEnum;
}
