import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserRequest } from './entities/user-request.entity';
import { UserRequestService } from './user-request.service';

@Controller('user-requests')
@ApiTags('User-requests')
@ApiBearerAuth()
export class UserRequestController {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Get()
  findAll(): Promise<UserRequest[]> {
    console.log('UserRequestController.findAll()');
    return this.userRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserRequest> {
    return this.userRequestService.findOne(+id);
  }

  @Post()
  create(@Body() userRequestData): Promise<UserRequest> {
    return this.userRequestService.create(userRequestData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userRequestData,
  ): Promise<UserRequest> {
    return this.userRequestService.update(+id, userRequestData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userRequestService.remove(+id);
  }
}
