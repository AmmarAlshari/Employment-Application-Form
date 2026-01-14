import { LookupsService } from './dynamicdata.service';
import { CreateCityDto } from './dto/createCity.dto';
export declare class LookupsController {
    private readonly LookupsService;
    constructor(LookupsService: LookupsService);
    getCities(): Promise<import("../database/entities/cities.entity").City[]>;
    getNationalities(): Promise<import("../database/entities/nationality.entity").Nationality[]>;
    getRoles(): Promise<import("../database/entities/selectedrole.entity").SelectedRole[]>;
    getQualifications(): Promise<import("../database/entities/qaualification.entity").Qualification[]>;
    createCity(dto: CreateCityDto): Promise<import("../database/entities/cities.entity").City>;
}
