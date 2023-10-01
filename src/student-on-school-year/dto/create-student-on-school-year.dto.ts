import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import {
  ProtectionType,
  SourceSystem,
  Status,
} from '../entities/student-on-school-year.entity';

export class CreateStudentOnSchoolYearDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  schoolYearId: number;

  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  sourceSystem: SourceSystem;

  @IsNotEmpty()
  protectionType: ProtectionType;

  @IsOptional()
  dateOfEnrollment: Date;
}
