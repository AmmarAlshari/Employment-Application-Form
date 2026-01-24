import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNationalityDto {
  @IsNotEmpty()
  @IsString()
  countryName: string;

  @IsNotEmpty()
  @IsString()
  countryNameAr: string;
}
