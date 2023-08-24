import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityModule } from '../activity/activity.module';
import { SchoolYearModule } from '../school-year/school-year.module';
import { StudentOnSchoolYearModule } from '../student-on-school-year/student-on-school-year.module';
import { StudentOnActivity } from './entities/student-on-activity.entity';
import { StudentOnActivityController } from './student-on-activity.controller';
import { StudentOnActivityService } from './student-on-activity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentOnActivity]),
    ActivityModule,
    StudentOnSchoolYearModule,
    SchoolYearModule,
  ],
  controllers: [StudentOnActivityController],
  providers: [StudentOnActivityService],
})
export class StudentOnActivityModule {}
