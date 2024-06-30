import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CreateStudentOnActivityDto } from './dto/create-student-on-activity.dto';
import { UpdateStudentOnActivityDto } from './dto/update-student-on-activity.dto';
import { StudentOnActivityService } from './student-on-activity.service';

@Controller('student-on-activity')
@ApiTags('Student on activity')
@ApiBearerAuth()
export class StudentOnActivityController {
  constructor(
    private readonly studentOnActivityService: StudentOnActivityService,
  ) {}

  @Post()
  create(@Body() createStudentOnActivityDto: CreateStudentOnActivityDto) {
    return this.studentOnActivityService.create(createStudentOnActivityDto);
  }

  @Get()
  @ApiQuery({
    name: 'studentOnSchoolYearId',
    type: Number,
    required: false,
  })
  findAll(
    @Query('studentOnSchoolYearId', new DefaultValuePipe(0), ParseIntPipe)
    studentOnSchoolYearId = 0,
  ) {
    if (studentOnSchoolYearId !== 0) {
      return this.studentOnActivityService.findAllByStudentOnSchoolYear(
        studentOnSchoolYearId,
      );
    } else {
      return this.studentOnActivityService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentOnActivityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentOnActivityDto: UpdateStudentOnActivityDto,
  ) {
    return this.studentOnActivityService.update(+id, {
      ...updateStudentOnActivityDto,
      unenrollmentDate: updateStudentOnActivityDto.unenrollmentDate ?? null,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentOnActivityService.remove(+id);
  }
}
