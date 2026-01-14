import { QualificationsService } from './qualifications.service';
import { CreateQualificationDto } from './dto/create-qual.dto';
import { UpdateQualificationDto } from './dto/update-qual.dto';
export declare class QualificationsController {
    private readonly qualService;
    constructor(qualService: QualificationsService);
    getAll(): Promise<import("../../database/entities/qaualification.entity").Qualification[]>;
    getOne(id: number): void;
    create(data: CreateQualificationDto): Promise<import("../../database/entities/qaualification.entity").Qualification>;
    update(id: number, data: UpdateQualificationDto): Promise<void>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
