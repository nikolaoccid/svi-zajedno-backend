import { IsNotEmpty, IsNumber } from 'class-validator';

export class SchoolYearDto {
  @IsNotEmpty()
  @IsNumber()
  startYear: number;

  @IsNumber()
  @IsNotEmpty()
  endYear: number;
}
