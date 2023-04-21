import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateStudentOnSchoolYearDto } from './create-student-on-school-year.dto';

export class UpdateStudentOnSchoolYearDto extends PartialType(
  CreateStudentOnSchoolYearDto,
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
