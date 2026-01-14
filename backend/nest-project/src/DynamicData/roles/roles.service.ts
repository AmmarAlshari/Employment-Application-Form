import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectedRole } from 'src/database/entities/selectedrole.entity';
import { Repository } from 'typeorm';
import { CreateRoleDoto } from './dto/create-role.dto';
import { UpdateRoleDoto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(SelectedRole)
    private readonly roleRepo: Repository<SelectedRole>,
  ) {}

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: number) {
    this.roleRepo.findOneBy({ id });
  }

  create(data: CreateRoleDoto) {
    const city = this.roleRepo.create(data);
    return this.roleRepo.save(city);
  }

  async update(id: number, data: UpdateRoleDoto) {
    await this.roleRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.roleRepo.delete(id);
    return { deleted: true };
  }
}
