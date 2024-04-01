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

import { SchoolYearDto } from './dto/school-year.dto';
import { SchoolYearService } from './school-year.service';

@Controller('school-year')
@ApiTags('School year')
@ApiBearerAuth()
export class SchoolYearController {
  constructor(private readonly schoolYearService: SchoolYearService) {}

  @Post()
  create(@Body() createSchoolYearDto: SchoolYearDto) {
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
    @Query() query: { query: string },
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.schoolYearService.findAll({ page, limit }, query.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolYearService.getById(+id);
  }
  @Get('/startYear/:startYear')
  findOneByStartYear(@Param('startYear') startYear: string) {
    return this.schoolYearService.getByStartYear(+startYear);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() schoolYearDto: SchoolYearDto) {
    this.schoolYearService.update(+id, schoolYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolYearService.remove(+id);
  }
}
