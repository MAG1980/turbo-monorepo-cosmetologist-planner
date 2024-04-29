import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@server/client/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
