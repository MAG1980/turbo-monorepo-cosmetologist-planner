import { CreateReceptionDto } from '@server/reception/dto/create-reception.dto';
import { PartialType } from '@nestjs/swagger';

export class GetReceptionsDto extends PartialType(CreateReceptionDto) {}
