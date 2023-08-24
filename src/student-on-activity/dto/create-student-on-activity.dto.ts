import { IsNotEmpty, IsNumber } from 'class-validator';

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
}
