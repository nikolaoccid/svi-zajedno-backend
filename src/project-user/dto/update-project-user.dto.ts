import { PartialType } from '@nestjs/swagger';
import { CreateProjectUserDto } from './create-project-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateProjectUserDto extends PartialType(CreateProjectUserDto) {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  oib: string;

  @IsNotEmpty()
  guardianName: string;

  @IsNotEmpty()
  guardianSurname: string;

  @IsNotEmpty()
  childName: string;

  @IsNotEmpty()
  childSurname: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @Optional()
  school: string;

  @IsNotEmpty()
  MobilePhone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
