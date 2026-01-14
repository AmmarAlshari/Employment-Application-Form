import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/database/entities/cities.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/createCity.dto';
import { UpdateCityDto } from './dto/updateCity.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly cityRepo: Repository<City>,
  ) {}

  findAll() {
    return this.cityRepo.find();
  }

  findOne(id: number) {
    this.cityRepo.findOneBy({ id });
  }

  create(data: CreateCityDto) {
    const city = this.cityRepo.create(data);
    return this.cityRepo.save(city);
  }

  async update(id: number, data: UpdateCityDto) {
    await this.cityRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.cityRepo.delete(id);
    return { deleted: true };
  }
}
