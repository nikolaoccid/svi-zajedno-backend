import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import {
  Gender,
  ProtectionType,
  SourceSystem,
} from '../entities/project-user.entity';

export class CreateProjectUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  oib: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  sourceSystem: SourceSystem;

  @IsNotEmpty()
  protectionType: ProtectionType;

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

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
