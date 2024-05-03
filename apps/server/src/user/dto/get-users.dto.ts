import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10)
  search?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  phone?: string;
}
