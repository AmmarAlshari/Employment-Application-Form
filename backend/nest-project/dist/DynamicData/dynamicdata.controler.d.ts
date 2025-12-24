import { LookupsService } from './dynamicdata.service';
export declare class LookupsController {
    private readonly LookupsService;
    constructor(LookupsService: LookupsService);
    getCities(): Promise<import("../database/entities/cities.entity").City[]>;
    getNationalities(): Promise<import("../database/entities/nationality.entity").Nationality[]>;
    getRoles(): Promise<import("../database/entities/selectedrole.entity").SelectedRole[]>;
}
