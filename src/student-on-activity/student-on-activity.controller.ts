import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  findAll(@AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnActivityService.findAll();
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
    return this.studentOnActivityService.update(
      +id,
      updateStudentOnActivityDto,
    );
  }

  @Delete(':id')
  remove(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.studentOnActivityService.remove(+id);
  }
}
