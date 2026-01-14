import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qualification } from 'src/database/entities/qaualification.entity';
import { Repository } from 'typeorm';
import { CreateQualificationDto } from './dto/create-qual.dto';
import { UpdateQualificationDto } from './dto/update-qual.dto';

@Injectable()
export class QualificationsService {
  constructor(
    @InjectRepository(Qualification)
    private readonly qalRepo: Repository<Qualification>,
  ) {}

  findAll() {
    return this.qalRepo.find();
  }

  findOne(id: number) {
    this.qalRepo.findOneBy({ id });
  }

  create(data: CreateQualificationDto) {
    const qualification = this.qalRepo.create(data);
    return this.qalRepo.save(qualification);
  }

  async update(id: number, data: UpdateQualificationDto) {
    await this.qalRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.qalRepo.delete(id);
    return { deleted: true };
  }
}
