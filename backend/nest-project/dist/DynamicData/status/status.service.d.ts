import { Status } from 'src/database/entities/status.entity';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dt';
export declare class StatusService {
    private readonly statRepo;
    constructor(statRepo: Repository<Status>);
    findAll(): Promise<Status[]>;
    findOne(id: number): Promise<Status | null>;
    findOneBy(status: string): Promise<Status | null>;
    createStatus(data: CreateStatusDto): Promise<Status>;
    updateStatus(id: number, data: UpdateStatusDto): Promise<Status | null>;
    delete(id: number): Promise<{
        deleted: boolean;
    }>;
}
