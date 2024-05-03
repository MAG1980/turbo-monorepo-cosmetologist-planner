import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId!: number;

  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @IsNotEmpty()
  @IsNumber()
  timeIntervalId!: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({ allowNaN: false }, { each: true })
  procedureIds!: number[];
}
