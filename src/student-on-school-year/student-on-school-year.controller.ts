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

import { ProjectUser } from '../project-user/entities/project-user.entity';
import { Pagination } from '../utils/pagination';
import { CreateStudentOnSchoolYearDto } from './dto/create-student-on-school-year.dto';
import { UpdateStudentOnSchoolYearDto } from './dto/update-student-on-school-year.dto';
import { Status } from './entities/student-on-school-year.entity';
import { StudentOnSchoolYearService } from './student-on-school-year.service';

@Controller('student-on-school-year')
@ApiTags('Student on school year')
@ApiBearerAuth()
export class StudentOnSchoolYearController {
  constructor(
    private readonly studentOnSchoolYearService: StudentOnSchoolYearService,
  ) {}

  @Post()
  create(@Body() createStudentOnSchoolYearDto: CreateStudentOnSchoolYearDto) {
    return this.studentOnSchoolYearService.create(createStudentOnSchoolYearDto);
  }

  @Get()
  @ApiQuery({
    name: 'userId',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'schoolYearId',
    type: Number,
    required: false,
  })
  findAll(
    @Query('userId', new DefaultValuePipe(0), ParseIntPipe) userId = 0,
    @Query('schoolYearId', new DefaultValuePipe(0), ParseIntPipe)
    schoolYearId = 0,
  ) {
    if (userId === 0 && schoolYearId === 0) {
      return this.studentOnSchoolYearService.findAll();
    } else {
      return this.studentOnSchoolYearService.findAllBySchoolYearAndUser(
        userId,
        schoolYearId,
      );
    }
  }

  @Get('users/:schoolYearId')
  @ApiQuery({
    name: 'query',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    enum: Status,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    required: false,
  })
  async findUsersBySchoolYear(
    @Query() query: { query: string },
    @Query() status: { status: Status },
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('sortBy') sortBy = undefined,
    @Param('schoolYearId') schoolYearId: string,
  ) {
    const allItems =
      await this.studentOnSchoolYearService.findUsersBySchoolYear(
        +schoolYearId,
        query.query,
        status.status,
        sortBy,
      );
    const pagination = new Pagination<ProjectUser>(allItems, { page, limit });
    return pagination.getPage();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentOnSchoolYearService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentOnSchoolYearDto: UpdateStudentOnSchoolYearDto,
  ) {
    return this.studentOnSchoolYearService.update(
      +id,
      updateStudentOnSchoolYearDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentOnSchoolYearService.remove(+id);
  }
}
