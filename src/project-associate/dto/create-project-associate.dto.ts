import { AssociateStatus } from '../entities/project-associate.entity';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../../category/entities/category.entity';

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
  category: Category;
}
