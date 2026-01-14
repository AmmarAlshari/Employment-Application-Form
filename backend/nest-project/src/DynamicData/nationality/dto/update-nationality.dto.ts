import { IsOptional, IsString } from 'class-validator';

export class UpdateNationalityDto {
    
  @IsOptional()
  @IsString()
  countryName: string;

  @IsOptional()
  @IsString()
  countryNameAr: string;
}
