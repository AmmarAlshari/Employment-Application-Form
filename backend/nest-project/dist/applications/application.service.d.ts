import { Repository } from 'typeorm';
import { Application } from '../database/entities/application.entity';
import { City } from '../database/entities/cities.entity';
import { Nationality } from '../database/entities/nationality.entity';
import { SelectedRole } from '../database/entities/selectedrole.entity';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { Qualification } from '../database/entities/qaualification.entity';
export declare class ApplicationService {
    private repo;
    private cityRepo;
    private natRepo;
    private roleRepo;
    private qualRepo;
    constructor(repo: Repository<Application>, cityRepo: Repository<City>, natRepo: Repository<Nationality>, roleRepo: Repository<SelectedRole>, qualRepo: Repository<Qualification>);
    create(data: CreateApplicationDto): Promise<Application>;
    findAll(): Promise<Application[]>;
    findOne(id: number): Promise<Application>;
    update(id: number, data: Partial<Application>): Promise<Application>;
}
