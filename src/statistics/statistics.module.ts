import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Activity } from '../activity/entities/activity.entity';
import { Category } from '../category/entities/category.entity';
import { ProjectAssociate } from '../project-associate/entities/project-associate.entity';
import { ProjectUser } from '../project-user/entities/project-user.entity';
import { SchoolYear } from '../school-year/entities/school-year.entity';
import { StudentOnActivity } from '../student-on-activity/entities/student-on-activity.entity';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      ProjectAssociate,
      Activity,
      SchoolYear,
      StudentOnActivity,
      ProjectUser,
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
