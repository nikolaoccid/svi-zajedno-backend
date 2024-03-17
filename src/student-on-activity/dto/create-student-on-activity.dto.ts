import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { ActivityStatus } from '../entities/student-on-activity.entity';

export class CreateStudentOnActivityDto {
  @IsNotEmpty()
  @IsNumber()
  activityId: number;

  @IsNotEmpty()
  @IsNumber()
  studentOnSchoolYearId: number;

  @IsNotEmpty()
  activityStatus: ActivityStatus;

  @IsOptional()
  enrollmentDate: Date;

  @IsOptional()
  unenrollmentDate: Date;
}
