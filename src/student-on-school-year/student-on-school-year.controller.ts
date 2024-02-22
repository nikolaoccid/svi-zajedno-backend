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
import { CreateStudentOnSchoolYearDto } from './dto/create-student-on-school-year.dto';
import { UpdateStudentOnSchoolYearDto } from './dto/update-student-on-school-year.dto';
import { StudentOnSchoolYearService } from './student-on-school-year.service';

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
    @AuthenticatedUser() user: User,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
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
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  async findUsersBySchoolYear(
    @Query() query: { query: string },
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Param('schoolYearId') schoolYearId: string,
    @AuthenticatedUser() user: User,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    const allItems =
      await this.studentOnSchoolYearService.findUsersBySchoolYear(
        +schoolYearId,
        query.query,
      );
    const totalCount = allItems.length;
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.min(totalPages, Math.max(1, page)); // Ensure currentPage is within valid range
    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalCount);

    const items = allItems.slice(startIndex, endIndex);

    return {
      items: items,
      meta: {
        currentPage: currentPage,
        itemCount: items.length,
        itemsPerPage: limit,
        totalItems: totalCount,
        totalPages: totalPages,
      },
    };
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
