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
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { ProjectUser } from './entities/project-user.entity';
import { ProjectUserService } from './project-user.service';

@Controller('project-user')
@ApiTags('Project-user')
@ApiBearerAuth()
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @Post()
  create(
    @Body() createProjectUserDto: CreateProjectUserDto,
  ): Promise<ProjectUser> {
    return this.projectUserService.create(createProjectUserDto);
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
  @ApiQuery({
    name: 'schoolYearId',
    type: Number,
    required: false,
  })
  findAll(
    @Query() query: { query: string },
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('schoolYearId') schoolYearId: number,
  ):
    | Promise<ProjectUser[]>
    | Promise<Pagination<ProjectUser, IPaginationMeta>> {
    if (query.query && schoolYearId) {
      return this.projectUserService.findOneByQueryAndStudentOnActivity(
        query.query,
        schoolYearId,
        { page, limit },
      );
    }
    if (query.query) {
      return this.projectUserService.findOneByQuery(query.query, {
        page,
        limit,
      });
    }
    return this.projectUserService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectUserService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectUserDto: UpdateProjectUserDto,
  ) {
    return this.projectUserService.update(+id, updateProjectUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectUserService.remove(+id);
  }
}
