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
import { ProjectAssociateService } from './project-associate.service';
import { CreateProjectAssociateDto } from './dto/create-project-associate.dto';
import { UpdateProjectAssociateDto } from './dto/update-project-associate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserRole } from '../users/user.entity';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';

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
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.projectAssociateService.create(createProjectAssociateDto);
  }

  @Get()
  findAll(@AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
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

  @Patch(':id')
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
