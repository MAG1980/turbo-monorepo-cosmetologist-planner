import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReceptionDto {
  @IsNotEmpty()
  @IsDateString()
  date?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Max(16)
  @Min(1)
  timeInterval?: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  available?: boolean;
}
