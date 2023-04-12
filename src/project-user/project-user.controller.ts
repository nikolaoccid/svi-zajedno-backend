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
import { ProjectUserService } from './project-user.service';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserRole } from '../users/user.entity';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';

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

  @Patch(':id')
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
