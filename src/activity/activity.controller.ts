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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Controller('activity')
@ApiBearerAuth()
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

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

  @Get()
  findAll(@AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.activityService.findAll();
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
