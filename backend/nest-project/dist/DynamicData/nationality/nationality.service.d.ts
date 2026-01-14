import { Nationality } from 'src/database/entities/nationality.entity';
import { Repository } from 'typeorm';
import { CreateNationalityDto } from './dto/create-nationalty.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
export declare class NationalityService {
    private readonly natRepo;
    constructor(natRepo: Repository<Nationality>);
    findAll(): Promise<Nationality[]>;
    findOne(id: number): void;
    create(data: CreateNationalityDto): Promise<Nationality>;
    update(id: number, data: UpdateNationalityDto): Promise<void>;
    delete(id: number): Promise<{
        deleted: boolean;
    }>;
}
