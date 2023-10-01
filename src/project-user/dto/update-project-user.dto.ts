import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CreateProjectUserDto } from './create-project-user.dto';

export class UpdateProjectUserDto extends PartialType(CreateProjectUserDto) {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  oib: string;

  @IsNotEmpty()
  @IsString()
  guardianName: string;

  @IsNotEmpty()
  @IsString()
  guardianSurname: string;

  @IsNotEmpty()
  @IsString()
  childName: string;

  @IsNotEmpty()
  @IsString()
  childSurname: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  school: string;

  @IsNotEmpty()
  @IsString()
  mobilePhone: string;

  @IsOptional()
  email: string;
}
