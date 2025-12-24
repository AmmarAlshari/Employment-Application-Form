import {
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(10, 10)
  nationalId: string;

  @IsNotEmpty()
  @Length(9, 9)
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsInt()
  nationalityId: number;

  @IsOptional()
  @IsInt()
  favoriteCityId?: number;

  @IsOptional()
  selectedRoleIds?: number[];

  @IsNotEmpty()
  experienceLevel: string;

  @IsOptional()
  isFreshGraduate?: boolean;

  @IsOptional()
  qualification?: string;

  @IsOptional()
  major?: string;

  @IsOptional()
  currentPosition?: string;

  @IsOptional()
  experienceYears?: number;

  @IsOptional()
  otherRoleRemarks?: string;

  @IsOptional()
  remarks?: string;
}
