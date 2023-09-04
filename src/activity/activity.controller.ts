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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityStatus } from './entities/activity.entity';

@Controller('activity')
@ApiBearerAuth()
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiQuery({
    name: 'schoolYearId',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'studentOnSchoolYearId',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'query',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'activityStatus',
    enum: ActivityStatus,
    required: false,
  })
  findAll(
    @AuthenticatedUser() user: User,
    @Query() query: { query: string },
    @Query('schoolYearId', new DefaultValuePipe(0), ParseIntPipe)
    schoolYearId = 0,
    @Query('studentOnSchoolYearId', new DefaultValuePipe(0), ParseIntPipe)
    studentOnSchoolYearId = 0,
    @Query('activityStatus') activityStatus: ActivityStatus,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    if (
      schoolYearId !== 0 ||
      query.query !== undefined ||
      activityStatus !== undefined ||
      studentOnSchoolYearId !== 0
    ) {
      return this.activityService.findAllActiveActivitiesBySchoolYearAndQuery(
        query.query,
        schoolYearId,
        activityStatus,
        studentOnSchoolYearId,
      );
    } else {
      return this.activityService.findAll();
    }
  }

  @Post()
  create(
    @Body() createActivityDto: CreateActivityDto,
    @AuthenticatedUser() user: User,
  ): Promise<Activity> {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.activityService.create(createActivityDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.activityService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @AuthenticatedUser() user: User,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.activityService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.activityService.remove(+id);
  }
}
