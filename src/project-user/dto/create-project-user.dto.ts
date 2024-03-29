import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { Gender } from '../entities/project-user.entity';

export class CreateProjectUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  oib: string;

  @IsNotEmpty()
  gender: Gender;

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
  dateOfBirth: Date;

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
