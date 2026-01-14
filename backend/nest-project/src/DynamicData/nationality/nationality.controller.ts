import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NationalityService } from './nationality.service';
import { CreateNationalityDto } from './dto/create-nationalty.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';

@Controller('nationalities')
export class NationalityController {
  constructor(private readonly natService: NationalityService) {}

  @Get()
  getAll() {
    return this.natService.findAll();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.natService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateNationalityDto) {
    return this.natService.create(data);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateNationalityDto) {
    return this.natService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.natService.delete(id);
  }
}
