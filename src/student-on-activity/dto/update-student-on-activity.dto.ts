import { PartialType } from '@nestjs/swagger';

import { CreateStudentOnActivityDto } from './create-student-on-activity.dto';

export class UpdateStudentOnActivityDto extends PartialType(
  CreateStudentOnActivityDto,
) {}
