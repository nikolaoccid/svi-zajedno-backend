import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { RequestStatus } from '../enums/request-status.enum';
import { UserRequestCategory } from '../enums/user-request-category.enum';

export class CreateUserRequestDto {
  @IsEnum(RequestStatus)
  @IsNotEmpty()
  userRequestStatus: RequestStatus;

  @IsEnum(UserRequestCategory)
  @IsNotEmpty()
  userRequestCategory: UserRequestCategory;

  @IsNotEmpty()
  @IsString()
  userRequestTitle: string;

  @IsOptional()
  @IsString()
  userRequestDescription?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  userRequestQuantity?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  userRequestCostPerUnit: number;

  @IsNotEmpty()
  @IsString()
  userRequestStoreInfo: string;

  @IsOptional()
  studentOnSchoolYearId?: number;

  @IsOptional()
  studentOnActivityId?: number;
}
