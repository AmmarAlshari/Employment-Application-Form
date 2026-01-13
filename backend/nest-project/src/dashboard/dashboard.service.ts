import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DashBoardUser } from 'src/database/entities/dashboardusers.entity';
import { Repository } from 'typeorm';
import { CreateDashboardUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DashboardUsersService {
  constructor(
    @InjectRepository(DashBoardUser)
    private userRepo: Repository<DashBoardUser>,
  ) {}

  // Creating new Dashboard users

  async createUser(user: CreateDashboardUserDto) {
    const existingUser = await this.userRepo.findOneBy({ email: user.email });

    if (existingUser) {
      throw new NotFoundException('Email already in use');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser = this.userRepo.create({
      email: user.email,
      password: hashedPassword,
      role: user.role,
    });
    return await this.userRepo.save(newUser);
  }

  // finde one dashboard user

  async findUserByEmail(email: string): Promise<DashBoardUser | null> {
    return await this.userRepo.findOneBy({ email });
  }

  async getUsers(): Promise<DashBoardUser[]> {
    return this.userRepo.find();
  }
}
