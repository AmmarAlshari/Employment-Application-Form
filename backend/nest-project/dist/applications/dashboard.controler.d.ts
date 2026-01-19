import { Application } from '../database/entities/application.entity';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dtos/application.dto';
export declare class PrivateAppController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    create(data: CreateApplicationDto): Promise<Application>;
    findAll(): Promise<Application[]>;
    findOne(id: number): Promise<Application>;
    updateStatus(id: number, body: {
        statusId: number;
    }): Promise<Application>;
}
