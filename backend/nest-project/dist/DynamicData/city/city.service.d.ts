import { City } from 'src/database/entities/cities.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/createCity.dto';
import { UpdateCityDto } from './dto/updateCity.dto';
export declare class CityService {
    private readonly cityRepo;
    constructor(cityRepo: Repository<City>);
    findAll(): Promise<City[]>;
    findOne(id: number): void;
    create(data: CreateCityDto): Promise<City>;
    update(id: number, data: UpdateCityDto): Promise<void>;
    delete(id: number): Promise<{
        deleted: boolean;
    }>;
}
