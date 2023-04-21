import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
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
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectUserService.create(createProjectUserDto);
  }

  @Get()
  findAll(@AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
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
