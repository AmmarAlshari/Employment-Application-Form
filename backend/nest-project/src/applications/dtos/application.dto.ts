import {
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsInt,
  IsEnum,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { EnglishLevel } from 'src/common/enums/englishlevel.enum';
import { Gender } from 'src/common/enums/gender.enum';

export class CreateApplicationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nationalId: string;

  @IsNotEmpty()
  @Length(9, 9)
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(Gender)
  gender: Gender;

  @Type(() => Number)
  @IsInt()
  nationalityId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  favoriteCityId?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  selectedRoleIds?: number[];

  @IsEnum(EnglishLevel)
  experienceLevel: EnglishLevel;

  @Transform(
    ({ value }) => value === true || value === 'true' || value === 'Yes',
  )
  @IsBoolean()
  isFreshGraduate: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  qualificationId?: number;

  @IsOptional()
  major?: string;

  @IsOptional()
  currentPosition?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  experienceYears?: number;

  @IsOptional()
  otherRoleRemarks?: string;

  @IsOptional()
  remarks?: string;
}
