import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ProjectAssociatesStatistics } from './dto/project-associate.dto';
import { ProjectUserStatistics } from './dto/project-user.dto';
import { StatisticsService } from './statistics.service';

@Controller('Statistics')
@ApiTags('Statistics')
@ApiBearerAuth()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/project-associates/:schoolYearId')
  projectAssociateStatistics(
    @Param('schoolYearId') schoolYearId: string,
  ): Promise<ProjectAssociatesStatistics[]> {
    return this.statisticsService.getProjectAssociatesStatistics(+schoolYearId);
  }
  @Get('/project-users/:schoolYearId')
  projectUsersStatistics(
    @Param('schoolYearId') schoolYearId: string,
  ): Promise<ProjectUserStatistics> {
    return this.statisticsService.getProjectUserStatistics(+schoolYearId);
  }
}
