import { IsNotEmpty, IsString } from "class-validator";

export class CreateQualificationDto {
    @IsNotEmpty()
    @IsString()
    qualificationName: string
    
    @IsNotEmpty()
    @IsString()
    qualificationNameAr: string
}