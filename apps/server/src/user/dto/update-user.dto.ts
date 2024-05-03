import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@server/user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
