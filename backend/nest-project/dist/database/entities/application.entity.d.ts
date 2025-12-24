import { SelectedRole } from './selectedrole.entity';
import { City } from './cities.entity';
import { Nationality } from './nationality.entity';
export declare class Application {
    id: number;
    name: string;
    mobile: string;
    email: string;
    gender: string;
    isFreshGraduate: boolean;
    qualification?: string;
    major?: string;
    currentPosition?: string;
    experienceYears?: number;
    experienceLevel: string;
    otherRoleRemarks?: string;
    remarks?: string;
    selectedRoles: SelectedRole[];
    favoriteCity?: City;
    nationality?: Nationality;
}
