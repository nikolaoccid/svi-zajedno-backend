import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { SchoolYearService } from './school-year.service';
import { SchoolYearDto } from './dto/school-year.dto';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  findAll(@AuthenticatedUser() user: User) {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.schoolYearService.findAll();
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
