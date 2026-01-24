import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nationality } from 'src/database/entities/nationality.entity';
import { Repository } from 'typeorm';
import { CreateNationalityDto } from './dto/create-nationalty.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';

@Injectable()
export class NationalityService {
  constructor(
    @InjectRepository(Nationality)
    private readonly natRepo: Repository<Nationality>,
  ) {}

  findAll() {
    return this.natRepo.find();
  }

  findOne(id: number) {
    this.natRepo.findOneBy({ id });
  }

  create(data: CreateNationalityDto) {
    const nationality = this.natRepo.create(data);
    return this.natRepo.save(nationality);
  }

  async update(id: number, data: UpdateNationalityDto) {
    await this.natRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.natRepo.delete(id);
    return { deleted: true };
  }
}
