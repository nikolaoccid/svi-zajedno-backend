import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(@AuthenticatedUser() user: User) {
    if (user.role !== 'admin') {
      throw new UnauthorizedException();
    }

    return await this.usersService.findAll();
  }

  @Get('me')
  async me(@AuthenticatedUser() user: User) {
    return user;
  }

  @Post()
  async create(
    @AuthenticatedUser() user: User,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (!user) {
      return new UnauthorizedException();
    }
    return await this.usersService.create(createUserDto);
  }
}
