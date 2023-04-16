import { PartialType } from '@nestjs/swagger';
import { CreateActivityDto } from './create-activity.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
