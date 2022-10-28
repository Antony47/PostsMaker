import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetManyUsersQueryDto } from './dto/get-many-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/passports/jwt-auth.guard';
import { User, UserPayload } from '../../shared/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(@Query() query: GetManyUsersQueryDto) {
    return this.userService.getMany(query.offset, query.limit, query.search);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOne(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@User() user: UserPayload, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@User() user: UserPayload) {
    return this.userService.delete(user.id);
  }
}
