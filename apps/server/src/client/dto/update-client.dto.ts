import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from '@server/client/dto/create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}
