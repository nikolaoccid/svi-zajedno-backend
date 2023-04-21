import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { AssociateStatus } from '../entities/project-associate.entity';

export class CreateProjectAssociateDto {
  @IsNotEmpty()
  clubName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  mobilePhone: string;

  @IsNotEmpty()
  contactPerson: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  projectAssociateStatus: AssociateStatus;

  @IsNotEmpty()
  categoryId: number;
}
