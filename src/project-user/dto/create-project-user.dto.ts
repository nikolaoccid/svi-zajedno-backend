import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { ignoreElements } from 'rxjs';

export class CreateProjectUserDto {
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

  @IsOptional()
  school: string;

  @IsNotEmpty()
  mobilePhone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
