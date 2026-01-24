import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  cityName: string;
  @IsNotEmpty()
  @IsString()
  cityNameAr: string;
}
