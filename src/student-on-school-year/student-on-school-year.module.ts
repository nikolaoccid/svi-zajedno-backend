import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentOnSchoolYear } from './entities/student-on-school-year.entity';
import { StudentOnSchoolYearController } from './student-on-school-year.controller';
import { StudentOnSchoolYearService } from './student-on-school-year.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentOnSchoolYear])],
  controllers: [StudentOnSchoolYearController],
  providers: [StudentOnSchoolYearService],
})
export class StudentOnSchoolYearModule {}
