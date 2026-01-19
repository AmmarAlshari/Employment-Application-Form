import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dt';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    getAll(): Promise<import("../../database/entities/status.entity").Status[]>;
    create(data: CreateStatusDto): Promise<import("../../database/entities/status.entity").Status>;
    update(id: number, data: UpdateStatusDto): Promise<import("../../database/entities/status.entity").Status | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
