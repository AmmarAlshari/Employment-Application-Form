import { Application } from '../database/entities/application.entity';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';

@Controller('applications')
export class ApplicationController {
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

  // update an application by ID

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateApplicationDto>,
  ): Promise<Application> {
    return this.applicationService.update(id, updateData);
  }
}
