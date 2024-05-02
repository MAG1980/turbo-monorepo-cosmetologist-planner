import { PickType } from '@nestjs/swagger';
import { CreateReceptionDto } from '@server/reception/dto/create-reception.dto';

export class UpdateReceptionDto extends PickType(CreateReceptionDto, [
  'available',
] as const) {}
