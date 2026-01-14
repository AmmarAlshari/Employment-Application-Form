import { Qualification } from 'src/database/entities/qaualification.entity';
import { Repository } from 'typeorm';
import { CreateQualificationDto } from './dto/create-qual.dto';
import { UpdateQualificationDto } from './dto/update-qual.dto';
export declare class QualificationsService {
    private readonly qalRepo;
    constructor(qalRepo: Repository<Qualification>);
    findAll(): Promise<Qualification[]>;
    findOne(id: number): void;
    create(data: CreateQualificationDto): Promise<Qualification>;
    update(id: number, data: UpdateQualificationDto): Promise<void>;
    delete(id: number): Promise<{
        deleted: boolean;
    }>;
}
