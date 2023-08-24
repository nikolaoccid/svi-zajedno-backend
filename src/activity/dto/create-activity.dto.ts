import { IsNotEmpty, IsNumber } from 'class-validator';

import { ActivityStatus } from '../entities/activity.entity';

export class CreateActivityDto {
  @IsNotEmpty()
  activityName: string;

  @IsNotEmpty()
  @IsNumber()
  activityPrice: number;

  @IsNotEmpty()
  activityStatus: ActivityStatus;

  @IsNotEmpty()
  @IsNumber()
  projectAssociateId: number;

  @IsNotEmpty()
  @IsNumber()
  schoolYearId: number;
}
