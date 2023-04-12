import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsAlpha,
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateProjectUserDto {
  @IsNotEmpty()
  @IsNumber()
  oib: number;

  @IsNotEmpty()
  @IsAlpha()
  guardianName: string;

  @IsNotEmpty()
  @IsAlpha()
  guardianSurname: string;

  @IsNotEmpty()
  @IsAlpha()
  childName: string;

  @IsNotEmpty()
  @IsAlpha()
  childSurname: string;

  @IsNotEmpty()
  @IsDate()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  address: string;

  @IsNotEmpty()
  @IsAlpha()
  city: string;

  @Optional()
  school: string;

  @IsNotEmpty()
  @IsMobilePhone()
  MobilePhone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
