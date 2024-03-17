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
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';
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
  create(
    @AuthenticatedUser() user: User,
    @Body() createStudentOnActivityDto: CreateStudentOnActivityDto,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnActivityService.create(createStudentOnActivityDto);
  }

  @Get()
  @ApiQuery({
    name: 'studentOnSchoolYearId',
    type: Number,
    required: false,
  })
  findAll(
    @AuthenticatedUser() user: User,
    @Query('studentOnSchoolYearId', new DefaultValuePipe(0), ParseIntPipe)
    studentOnSchoolYearId = 0,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    if (studentOnSchoolYearId !== 0) {
      return this.studentOnActivityService.findAllByStudentOnSchoolYear(
        studentOnSchoolYearId,
      );
    } else {
      return this.studentOnActivityService.findAll();
    }
  }

  @Get(':id')
  findOne(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnActivityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @AuthenticatedUser() user: User,
    @Param('id') id: string,
    @Body() updateStudentOnActivityDto: UpdateStudentOnActivityDto,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnActivityService.update(+id, {
      ...updateStudentOnActivityDto,
      unenrollmentDate: updateStudentOnActivityDto.unenrollmentDate ?? null,
    });
  }

  @Delete(':id')
  remove(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnActivityService.remove(+id);
  }
}
