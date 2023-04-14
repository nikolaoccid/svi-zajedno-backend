import { PartialType } from '@nestjs/swagger';
import { CreateProjectAssociateDto } from './create-project-associate.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateProjectAssociateDto extends PartialType(
  CreateProjectAssociateDto,
) {
  @IsNotEmpty()
  id: number;
}
