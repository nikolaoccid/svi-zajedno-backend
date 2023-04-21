import { IsNotEmpty, IsNumber } from 'class-validator';

import { Status } from '../entities/student-on-school-year.entity';

export class CreateStudentOnSchoolYearDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  schoolYearId: number;

  @IsNotEmpty()
  status: Status;
}
