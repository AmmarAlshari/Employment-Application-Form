import { IsOptional, IsString } from 'class-validator';

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  cityName: string;

  @IsOptional()
  @IsString()
  cityNameAr: string;
}
