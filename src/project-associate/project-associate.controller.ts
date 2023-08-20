import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';

import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { CreateProjectAssociateDto } from './dto/create-project-associate.dto';
import { UpdateProjectAssociateDto } from './dto/update-project-associate.dto';
import { ProjectAssociate } from './entities/project-associate.entity';
import { ProjectAssociateService } from './project-associate.service';

@Controller('project-associate')
@ApiBearerAuth()
@ApiTags('Project-Associate')
export class ProjectAssociateController {
  constructor(
    private readonly projectAssociateService: ProjectAssociateService,
  ) {}

  @Post()
  create(
    @Body() createProjectAssociateDto: CreateProjectAssociateDto,
    @AuthenticatedUser() user: User,
  ): Promise<ProjectAssociate> {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectAssociateService.create(createProjectAssociateDto);
  }

  @Get()
  @ApiQuery({
    name: 'query',
    type: String,
    required: false,
  })
  findAll(@Query() query: { query: string }, @AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    if (query.query) {
      return this.projectAssociateService.findOneByQuery(query.query);
    }

    return this.projectAssociateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectAssociateService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectAssociateDto: UpdateProjectAssociateDto,
    @AuthenticatedUser() user: User,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectAssociateService.update(+id, updateProjectAssociateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectAssociateService.remove(+id);
  }
}
