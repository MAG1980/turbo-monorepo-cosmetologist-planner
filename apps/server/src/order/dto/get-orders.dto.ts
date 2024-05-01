import { OrderStatus } from '@server/order/enums/OrderStatus.enum';
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import moment from 'moment-timezone';

export class GetOrdersDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) =>
    moment(value).tz('Europe/Moscow').format('YYYY-MM-DD'),
  )
  @IsISO8601()
  date?: Date;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(16)
  timeInterval?: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  procedureId?: number;
}
