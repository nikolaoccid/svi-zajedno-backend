import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectUserDto {
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

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
