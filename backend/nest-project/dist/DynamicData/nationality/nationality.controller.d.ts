import { NationalityService } from './nationality.service';
import { CreateNationalityDto } from './dto/create-nationalty.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
export declare class NationalityController {
    private readonly natService;
    constructor(natService: NationalityService);
    getAll(): Promise<import("../../database/entities/nationality.entity").Nationality[]>;
    getOne(id: number): void;
    create(data: CreateNationalityDto): Promise<import("../../database/entities/nationality.entity").Nationality>;
    update(id: number, data: UpdateNationalityDto): Promise<void>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
