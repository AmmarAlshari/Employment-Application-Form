import { Application } from '../database/entities/application.entity';
import { Repository } from 'typeorm';
export declare class UploadsService {
    private readonly applicationRepo;
    constructor(applicationRepo: Repository<Application>);
    attachCvToApplication(applicationId: number, resumeUrl: string): Promise<{
        message: string;
        applicationId: number;
        resumeUrl: string;
    }>;
}
