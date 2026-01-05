import { Application } from '../database/entities/application.entity';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dtos/application.dto';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    create(data: CreateApplicationDto): Promise<Application>;
    findAll(): Promise<Application[]>;
    findOne(id: number): Promise<Application>;
    update(id: number, updateData: Partial<CreateApplicationDto>): Promise<Application>;
}
