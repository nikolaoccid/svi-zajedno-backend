import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { ProjectAssociatesStatisticsResponse } from './dto/project-associate.dto';
import { ProjectUserStatisticsResponse } from './dto/project-user.dto';
import { StatisticsService } from './statistics.service';

@Controller('Statistics')
@ApiTags('Statistics')
@ApiBearerAuth()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/project-associates/:schoolYearId')
  projectAssociateStatistics(
    @AuthenticatedUser() user: User,
    @Param('schoolYearId') schoolYearId: string,
  ): Promise<ProjectAssociatesStatisticsResponse[]> {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.statisticsService.getProjectAssociatesStatistics(+schoolYearId);
  }
  @Get('/project-users/:schoolYearId')
  projectUsersStatistics(
    @AuthenticatedUser() user: User,
    @Param('schoolYearId') schoolYearId: string,
  ) {
    if (user.role != UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.statisticsService.getProjectUserStatistics(+schoolYearId);
  }
}
