import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { SortingParameterEnum } from '@server/procedure/enums/sorting-parameter.enum';
import { SortingOrderEnum } from '@server/common/enums/sorting-order.enum';

export class GetProceduresDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10)
  search?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SortingOrderEnum)
  sortingOrder?: SortingOrderEnum;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SortingParameterEnum)
  sortingParameter?: SortingParameterEnum;
}
