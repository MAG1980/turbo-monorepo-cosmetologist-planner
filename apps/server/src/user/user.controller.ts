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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@server/user/user.service';
import { GetUsersDto, UpdateUserDto } from '@server/user/dto';
import { UserResponse } from '@server/user/responses';
import { UserEntity } from '@server/user/entities/User.entity';
import { CurrentUser, Roles } from '@server/auth/decorators';
import type { JwtPayload } from '@server/auth/interfaces';
import { RolesGuard } from '@server/auth/guards/roles.guard';
import { UserRoleEnum } from '@server/user/enums/user-role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get('/me')
  async me(@CurrentUser() user: JwtPayload) {
    return user;
  }
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
