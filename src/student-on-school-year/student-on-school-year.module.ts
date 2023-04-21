import { Module } from '@nestjs/common';
import { StudentOnSchoolYearService } from './student-on-school-year.service';
import { StudentOnSchoolYearController } from './student-on-school-year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentOnSchoolYear } from './entities/student-on-school-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentOnSchoolYear])],
  controllers: [StudentOnSchoolYearController],
  providers: [StudentOnSchoolYearService],
})
export class StudentOnSchoolYearModule {}
