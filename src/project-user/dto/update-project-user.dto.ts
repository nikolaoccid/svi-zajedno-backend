import { PartialType } from '@nestjs/swagger';
import { CreateProjectUserDto } from './create-project-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

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

  @Optional()
  school: string;

  @IsNotEmpty()
  @IsString()
  mobilePhone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
