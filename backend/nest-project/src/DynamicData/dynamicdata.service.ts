import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../database/entities/cities.entity';
import { Nationality } from '../database/entities/nationality.entity';
import { SelectedRole } from '../database/entities/selectedrole.entity';
import { Qualification } from '../database/entities/qaualification.entity';

@Injectable()
export class LookupsService {
  constructor(
    @InjectRepository(City) private readonly cityRepo: Repository<City>,
    @InjectRepository(Nationality)
    private readonly natRepo: Repository<Nationality>,
    @InjectRepository(SelectedRole)
    private readonly roleRepo: Repository<SelectedRole>,
    @InjectRepository(Qualification)
    private readonly qualRepo: Repository<Qualification>,
  ) {}

  getCities() {
    return this.cityRepo.find();
  }

  getNationalities() {
    return this.natRepo.find();
  }

  getRoles() {
    return this.roleRepo.find();
  }
  getQualifications() {
    return this.qualRepo.find();
  }
}
