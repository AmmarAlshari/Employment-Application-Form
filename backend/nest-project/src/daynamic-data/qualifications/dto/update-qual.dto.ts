import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateQualificationDto {
  @IsOptional()
  @IsString()
  qualificationName: string;

  @IsOptional()
  @IsString()
  qualificationNameAr: string;
}
