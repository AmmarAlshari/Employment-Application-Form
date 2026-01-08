import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dtos/application.dto';
export declare class PublicAppController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    create(data: CreateApplicationDto): Promise<import("../database/entities/application.entity").Application>;
}
