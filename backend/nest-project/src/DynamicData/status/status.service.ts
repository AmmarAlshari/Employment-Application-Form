import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/database/entities/status.entity';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dt';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statRepo: Repository<Status>,
  ) {}

  findAll() {
    return this.statRepo.find();
  }

  findOne(id: number) {
    return this.statRepo.findOneBy({ id });
  }
  findOneBy(status: string) {
    return this.statRepo.findOneBy({ status });
  }

  async createStatus(data: CreateStatusDto) {
    const status = this.statRepo.create(data);
    return await this.statRepo.save(status);
  }

  async updateStatus(id: number, data: UpdateStatusDto) {
    this.statRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.statRepo.delete(id);
    return { deleted: true };
  }
}
