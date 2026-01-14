import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QualificationsService } from './qualifications.service';
import { CreateQualificationDto } from './dto/create-qual.dto';
import { UpdateQualificationDto } from './dto/update-qual.dto';

@Controller('qualifications')
export class QualificationsController {
  constructor(private readonly qualService: QualificationsService) {}

  @Get()
  getAll() {
    return this.qualService.findAll();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.qualService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateQualificationDto) {
    return this.qualService.create(data);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateQualificationDto) {
    return this.qualService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.qualService.delete(id);
  }
}
