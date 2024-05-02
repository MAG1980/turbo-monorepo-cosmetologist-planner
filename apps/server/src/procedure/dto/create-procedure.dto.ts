import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProcedureDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 25)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;
}
