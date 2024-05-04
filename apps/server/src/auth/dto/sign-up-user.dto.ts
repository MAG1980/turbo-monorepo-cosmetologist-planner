import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { UserRoleEnum } from '@server/user/enums/user-role.enum';
import { IsPasswordMatchConstraint } from '@server/auth/decorators/is-password-match-constrain.decorator';

export class SignUpUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  readonly login!: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(35)
  readonly name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsPhoneNumber('RU')
  phone!: string;

  @IsArray()
  @IsEnum(UserRoleEnum, { each: true })
  roles!: UserRoleEnum[];

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  readonly password!: string;

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  @Validate(IsPasswordMatchConstraint)
  readonly passwordConfirm!: string;
}
