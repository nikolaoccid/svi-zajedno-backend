import { ActivityStatus } from '../entities/activity.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  activityName: string;
  @IsNotEmpty()
  @IsNumber()
  activityPrice: number;

  @IsNotEmpty()
  activityStatus: ActivityStatus;
  @IsNotEmpty()
  projectAssociateId: number;
}
