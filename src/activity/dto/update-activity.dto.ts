import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
