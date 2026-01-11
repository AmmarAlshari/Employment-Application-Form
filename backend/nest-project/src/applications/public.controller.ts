import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dtos/application.dto';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('applications')
export class PublicAppController {
  constructor(private readonly applicationService: ApplicationService) {}

  // create a new application
  @Post()
  create(@Body() data: CreateApplicationDto) {
    return this.applicationService.create(data);
  }
}
