import { Repository } from 'typeorm';
import { Application } from '../database/entities/application.entity';
import { City } from '../database/entities/cities.entity';
import { Nationality } from '../database/entities/nationality.entity';
import { SelectedRole } from '../database/entities/selectedrole.entity';
import { CreateApplicationDto } from './dtos/application.dto';
import { Qualification } from '../database/entities/qaualification.entity';
import { Status } from 'src/database/entities/status.entity';
export declare class ApplicationService {
    private repo;
    private cityRepo;
    private natRepo;
    private roleRepo;
    private qualRepo;
    private statusRepo;
    constructor(repo: Repository<Application>, cityRepo: Repository<City>, natRepo: Repository<Nationality>, roleRepo: Repository<SelectedRole>, qualRepo: Repository<Qualification>, statusRepo: Repository<Status>);
    create(data: CreateApplicationDto): Promise<Application>;
    findAll(): Promise<Application[]>;
    findOne(id: number): Promise<Application>;
    updateApplicationStatus(applicationId: number, statusId: number): Promise<Application>;
}
