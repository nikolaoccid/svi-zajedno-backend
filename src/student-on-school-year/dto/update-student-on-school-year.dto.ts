import { PartialType } from '@nestjs/swagger';
import { CreateStudentOnSchoolYearDto } from './create-student-on-school-year.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStudentOnSchoolYearDto extends PartialType(
  CreateStudentOnSchoolYearDto,
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
