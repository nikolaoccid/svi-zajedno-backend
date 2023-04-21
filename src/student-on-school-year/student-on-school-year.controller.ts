import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentOnSchoolYearService } from './student-on-school-year.service';
import { CreateStudentOnSchoolYearDto } from './dto/create-student-on-school-year.dto';
import { UpdateStudentOnSchoolYearDto } from './dto/update-student-on-school-year.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';

@Controller('student-on-school-year')
@ApiTags('Student on school year')
@ApiBearerAuth()
export class StudentOnSchoolYearController {
  constructor(
    private readonly studentOnSchoolYearService: StudentOnSchoolYearService,
  ) {}

  @Post()
  create(
    @AuthenticatedUser() user: User,
    @Body() createStudentOnSchoolYearDto: CreateStudentOnSchoolYearDto,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnSchoolYearService.create(createStudentOnSchoolYearDto);
  }

  @Get()
  findAll(@AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnSchoolYearService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnSchoolYearService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentOnSchoolYearDto: UpdateStudentOnSchoolYearDto,
    @AuthenticatedUser() user: User,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnSchoolYearService.update(
      +id,
      updateStudentOnSchoolYearDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnSchoolYearService.remove(+id);
  }
}
