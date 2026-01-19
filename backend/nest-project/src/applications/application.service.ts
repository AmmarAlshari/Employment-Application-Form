import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Application } from '../database/entities/application.entity';
import { City } from '../database/entities/cities.entity';
import { Nationality } from '../database/entities/nationality.entity';
import { SelectedRole } from '../database/entities/selectedrole.entity';
import { CreateApplicationDto } from './dtos/application.dto';
import { Qualification } from '../database/entities/qaualification.entity';
import { Status } from 'src/database/entities/status.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application) private repo: Repository<Application>,
    @InjectRepository(City) private cityRepo: Repository<City>,
    @InjectRepository(Nationality) private natRepo: Repository<Nationality>,
    @InjectRepository(SelectedRole) private roleRepo: Repository<SelectedRole>,
    @InjectRepository(Qualification)
    private qualRepo: Repository<Qualification>,
    @InjectRepository(Status)
    private statusRepo: Repository<Status>,
  ) {}

  async create(data: CreateApplicationDto) {
    console.log('Creating application with data:', data);

    // Build application with normal fields
    const application = this.repo.create({
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      gender: data.gender,
      nationalId: data.nationalId,
      experienceLevel: data.experienceLevel,
      isFreshGraduate: data.isFreshGraduate ?? false,
      major: data.major,
      currentPosition: data.currentPosition,
      experienceYears: data.experienceYears,
      otherRoleRemarks: data.otherRoleRemarks,
      remarks: data.remarks,
    });

    const defaultStatus = await this.statusRepo.findOneBy({ status: 'NEW' });

    if (!defaultStatus) {
      throw new NotFoundException('default new not found');
    }

    application.ApplicationStatus = defaultStatus;

    const nationality = await this.natRepo.findOneBy({
      id: data.nationalityId,
    });
    if (!nationality) {
      throw new NotFoundException(
        `Nationality with id ${data.nationalityId} not found`,
      );
    }
    application.nationality = nationality;

    if (data.favoriteCityId) {
      const city = await this.cityRepo.findOneBy({ id: data.favoriteCityId });
      if (!city) {
        throw new NotFoundException(
          `City with id ${data.favoriteCityId} not found`,
        );
      }
      application.favoriteCity = city;
    }

    if (
      Array.isArray(data.selectedRoleIds) &&
      data.selectedRoleIds.length > 0
    ) {
      const roles = await this.roleRepo.findBy({
        id: In(data.selectedRoleIds),
      });

      // optional strict check: ensure all ids exist
      if (roles.length !== data.selectedRoleIds.length) {
        throw new NotFoundException(`One or more selected roles not found`);
      }

      application.selectedRoles = roles;
    } else {
      application.selectedRoles = [];
    }

    const qualification = await this.qualRepo.findOneBy({
      id: data.qualificationId,
    });

    if (!qualification) {
      throw new NotFoundException(
        `Qualification with id ${data.qualificationId} not found`,
      );
    }
    application.qualification = qualification;

    return this.repo.save(application);
  }

  //find all applications

  findAll() {
    return this.repo.find({
      relations: [
        'favoriteCity',
        'nationality',
        'selectedRoles',
        'qualification',
        'ApplicationStatus',
      ],
    });
  }

  // find one application by ID

  async findOne(id: number): Promise<Application> {
    const data = await this.repo.findOne({
      where: { id },
      relations: [
        'favoriteCity',
        'nationality',
        'selectedRoles',
        'qualification',
        'ApplicationStatus',
      ],
    });

    if (!data) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return data;
  }

  // update an application by ID
  async updateApplicationStatus(applicationId: number, statusId: number) {
    const application = await this.repo.findOne({
      where: { id: applicationId },
      relations: ['ApplicationStatus'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    const status = await this.statusRepo.findOneBy({ id: statusId });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    application.ApplicationStatus = status;

    return this.repo.save(application);
  }
}
