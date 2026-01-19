import { Application } from '../database/entities/application.entity';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dtos/application.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('ApplicationDashboard')
export class PrivateAppController {
  constructor(private readonly applicationService: ApplicationService) {}

  // create a new application
  @Post()
  create(@Body() data: CreateApplicationDto) {
    return this.applicationService.create(data);
  }

  // get all applications
  @Get()
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  // get a single application by ID

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Application> {
    return this.applicationService.findOne(id);
  }

  // update an application by status

  @Put(':id/status')
  updateApplicationStatus(
    @Param('id') id: number,
    @Body() body: { statusId: number },
  ): Promise<Application> {
    return this.applicationService.updateApplicationStatus(id, body.statusId);
  }

  @Delete(':id')
  deleteApplication(@Param('id') id: number) {
    return this.applicationService.deleteApplicationByStatus(id);
  }
}
