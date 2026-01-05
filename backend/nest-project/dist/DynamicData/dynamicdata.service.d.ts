import { Repository } from 'typeorm';
import { City } from '../database/entities/cities.entity';
import { Nationality } from '../database/entities/nationality.entity';
import { SelectedRole } from '../database/entities/selectedrole.entity';
import { Qualification } from '../database/entities/qaualification.entity';
export declare class LookupsService {
    private readonly cityRepo;
    private readonly natRepo;
    private readonly roleRepo;
    private readonly qualRepo;
    constructor(cityRepo: Repository<City>, natRepo: Repository<Nationality>, roleRepo: Repository<SelectedRole>, qualRepo: Repository<Qualification>);
    getCities(): Promise<City[]>;
    getNationalities(): Promise<Nationality[]>;
    getRoles(): Promise<SelectedRole[]>;
    getQualifications(): Promise<Qualification[]>;
}
