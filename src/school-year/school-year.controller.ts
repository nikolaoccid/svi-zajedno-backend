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
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { SchoolYearDto } from './dto/school-year.dto';
import { SchoolYearService } from './school-year.service';

@Controller('school-year')
@ApiTags('School year')
@ApiBearerAuth()
export class SchoolYearController {
  constructor(private readonly schoolYearService: SchoolYearService) {}

  @Post()
  create(
    @AuthenticatedUser() user: User,
    @Body() createSchoolYearDto: SchoolYearDto,
  ) {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.schoolYearService.create(createSchoolYearDto);
  }

  @Get()
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
  findAll(
    @AuthenticatedUser() user: User,
    @Query() query: { query: string },
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.schoolYearService.findAll({ page, limit }, query.query);
  }

  @Get(':id')
  findOne(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.schoolYearService.getById(+id);
  }
  @Get('/startYear/:startYear')
  findOneByStartYear(
    @AuthenticatedUser() user: User,
    @Param('startYear') startYear: string,
  ) {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.schoolYearService.getByStartYear(+startYear);
  }

  @Put(':id')
  update(
    @AuthenticatedUser() user: User,
    @Param('id') id: string,
    @Body() schoolYearDto: SchoolYearDto,
  ) {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    this.schoolYearService.update(+id, schoolYearDto);
  }

  @Delete(':id')
  remove(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.schoolYearService.remove(+id);
  }
}
