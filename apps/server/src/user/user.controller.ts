import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@server/user/user.service';
import { GetUsersDto, UpdateUserDto } from '@server/user/dto';
import { UserResponse } from '@server/user/responses';
import { UserEntity } from '@server/user/entities/User.entity';
import { CurrentUser } from '@server/auth/decorators';
import type { JwtPayload } from '@server/auth/interfaces';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query() getUsersDto: GetUsersDto) {
    const users = await this.userService.findAll(getUsersDto);
    return users.map((user: UserEntity) => new UserResponse(user));
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return new UserResponse(user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.userService.remove(id, user);
  }
}
