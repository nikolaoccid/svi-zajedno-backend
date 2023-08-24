import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateStudentOnActivityDto } from './create-student-on-activity.dto';

export class UpdateStudentOnActivityDto extends PartialType(
  CreateStudentOnActivityDto,
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
