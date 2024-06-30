import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserRequest } from './entities/user-request.entity';
import { UserRequestService } from './user-request.service';

@Controller('user-requests')
@ApiTags('User-requests')
@ApiBearerAuth()
export class UserRequestController {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Get()
  @ApiQuery({
    name: 'studentOnSchoolYearId',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'studentOnActivityId',
    type: Number,
    required: false,
  })
  findAll(
    @Query('studentOnSchoolYearId', new DefaultValuePipe(0), ParseIntPipe)
    studentOnSchoolYearId = 0,
    @Query('studentOnActivityId', new DefaultValuePipe(0), ParseIntPipe)
    studentOnActivityId = 0,
  ): Promise<UserRequest[]> {
    if (studentOnActivityId !== 0 && studentOnSchoolYearId !== 0) {
      return this.userRequestService.findAllByStudentOnSchoolYearAndActivity(
        studentOnSchoolYearId,
        studentOnActivityId,
      );
    } else if (studentOnSchoolYearId !== 0) {
      return this.userRequestService.findAllByStudentOnSchoolYear(
        studentOnSchoolYearId,
      );
    } else if (studentOnActivityId !== 0) {
      return this.userRequestService.findAllByStudentOnActivity(
        studentOnActivityId,
      );
    } else {
      return this.userRequestService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserRequest> {
    return this.userRequestService.findOne(+id);
  }

  @Post()
  create(@Body() userRequestData: CreateUserRequestDto): Promise<UserRequest> {
    return this.userRequestService.create(userRequestData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userRequestData: UpdateUserRequestDto,
  ): Promise<UserRequest> {
    return this.userRequestService.update(+id, userRequestData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRequestService.remove(+id);
  }
}
