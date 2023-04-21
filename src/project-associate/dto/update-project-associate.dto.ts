import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateProjectAssociateDto } from './create-project-associate.dto';

export class UpdateProjectAssociateDto extends PartialType(
  CreateProjectAssociateDto,
) {
  @IsNotEmpty()
  id: number;
}
