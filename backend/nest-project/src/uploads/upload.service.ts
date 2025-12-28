// uploads.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../database/entities/application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
  ) {}

  async attachCvToApplication(applicationId: number, resumeUrl: string) {
    const app = await this.applicationRepo.findOne({
      where: { id: applicationId },
    });
    if (!app) throw new NotFoundException('Application not found');

    app.resumeUrl = resumeUrl;
    await this.applicationRepo.save(app);

    return {
      message: 'CV uploaded successfully',
      applicationId: app.id,
      resumeUrl: app.resumeUrl,
    };
  }
}
