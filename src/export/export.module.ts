import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchoolYear } from '../school-year/entities/school-year.entity';
import { StudentOnActivity } from '../student-on-activity/entities/student-on-activity.entity';
import { StudentOnSchoolYear } from '../student-on-school-year/entities/student-on-school-year.entity';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolYear,
      StudentOnSchoolYear,
      StudentOnActivity,
    ]),
  ],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
