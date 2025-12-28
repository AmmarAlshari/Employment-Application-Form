import { EnglishLevel } from 'src/common/enums/englishlevel.enum';
import { Gender } from 'src/common/enums/gender.enum';
export declare class CreateApplicationDto {
    name: string;
    nationalId: string;
    mobile: string;
    email: string;
    gender: Gender;
    nationalityId: number;
    favoriteCityId?: number;
    selectedRoleIds?: number[];
    experienceLevel: EnglishLevel;
    isFreshGraduate: boolean;
    qualificationId?: number;
    major?: string;
    currentPosition?: string;
    experienceYears?: number;
    otherRoleRemarks?: string;
    remarks?: string;
}
