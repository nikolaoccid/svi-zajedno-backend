import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateStudentOnActivityDto } from './dto/create-student-on-activity.dto';
import { UpdateStudentOnActivityDto } from './dto/update-student-on-activity.dto';
import { StudentOnActivityService } from './student-on-activity.service';

@Controller('student-on-activity')
export class StudentOnActivityController {
  constructor(
    private readonly studentOnActivityService: StudentOnActivityService,
  ) {}

  @Post()
  create(@Body() createStudentOnActivityDto: CreateStudentOnActivityDto) {
    return this.studentOnActivityService.create(createStudentOnActivityDto);
  }

  @Get()
  findAll() {
    return this.studentOnActivityService.findAll();
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
    return this.studentOnActivityService.update(
      +id,
      updateStudentOnActivityDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentOnActivityService.remove(+id);
  }
}
