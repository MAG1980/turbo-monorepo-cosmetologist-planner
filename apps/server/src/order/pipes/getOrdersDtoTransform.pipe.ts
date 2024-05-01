import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { GetOrdersDto } from '@server/order/dto/get-orders.dto';
import { plainToInstance } from 'class-transformer';

export class GetOrdersDtoTransformPipe implements PipeTransform {
  async transform(value: GetOrdersDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }
    return plainToInstance(metatype, value);
  }
}
