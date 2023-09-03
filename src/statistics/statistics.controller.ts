import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { StatisticsService } from './statistics.service';

@Controller('Statistics')
@ApiTags('Statistics')
@ApiBearerAuth()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/project-associates/:schoolYearId')
  projectAssociateStatistics(@Param('schoolYearId') schoolYearId: string) {
    return this.statisticsService.getProjectAssociatesStatistics(+schoolYearId);
  }
  @Get('/project-users/:schoolYearId')
  projectUsersStatistics(@Param('schoolYearId') schoolYearId: string) {
    return this.statisticsService.getProjectUserStatistics(+schoolYearId);
  }
}
