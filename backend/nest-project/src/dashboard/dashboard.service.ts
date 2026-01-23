import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['assignedApplications'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === 'ADMIN') {
      throw new BadRequestException('Cant deleted Admin User');
    }

    if (user.assignedApplications?.length > 0) {
      throw new BadRequestException(
        'Cannot delete user assigned to applications',
      );
    }

    await this.userRepo.remove(user);

    return { message: 'User Deleted' };
  }
}
