import { PartialType } from '@nestjs/swagger';
import { CreateProcedureDto } from '@server/procedure/dto/create-procedure.dto';

export class UpdateProcedureDto extends PartialType(CreateProcedureDto) {}
