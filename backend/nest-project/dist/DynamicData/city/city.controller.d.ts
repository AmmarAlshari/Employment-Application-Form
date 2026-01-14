import { CityService } from './city.service';
import { CreateCityDto } from './dto/createCity.dto';
import { UpdateCityDto } from './dto/updateCity.dto';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    getAll(): Promise<import("../../database/entities/cities.entity").City[]>;
    getOne(id: number): void;
    create(data: CreateCityDto): Promise<import("../../database/entities/cities.entity").City>;
    update(id: number, data: UpdateCityDto): Promise<void>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
