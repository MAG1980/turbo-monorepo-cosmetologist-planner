import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateClientDto {
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

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  readonly password!: string;
}
