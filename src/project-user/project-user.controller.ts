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

import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';
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
    @AuthenticatedUser() user: User,
    @Body() createProjectUserDto: CreateProjectUserDto,
  ): Promise<ProjectUser> {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectUserService.create(createProjectUserDto);
  }

  @Get()
  @ApiQuery({
    name: 'query',
    type: String,
    required: false,
  })
  findAll(@AuthenticatedUser() user: User, @Query() query: { query: string }) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    if (query.query) {
      return this.projectUserService.findOneByQuery(query.query);
    }
    return this.projectUserService.findAll();
  }

  @Get(':id')
  findOne(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectUserService.findOne(+id);
  }

  @Put(':id')
  update(
    @AuthenticatedUser() user: User,
    @Param('id') id: string,
    @Body() updateProjectUserDto: UpdateProjectUserDto,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectUserService.update(+id, updateProjectUserDto);
  }

  @Delete(':id')
  remove(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectUserService.remove(+id);
  }
}
