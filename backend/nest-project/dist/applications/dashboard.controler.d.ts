import { Application } from '../database/entities/application.entity';
import { ApplicationService } from './application.service';
export declare class PrivateAppController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    findAll(): Promise<Application[]>;
    updateApplicationStatus(id: number, body: {
        statusId: number;
    }): Promise<Application>;
    deleteApplication(id: number): Promise<{
        message: string;
    }>;
    assignApplication(id: number, body: {
        assignedUserId: number;
    }): Promise<Application>;
}
