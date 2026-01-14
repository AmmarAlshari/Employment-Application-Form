import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/createCity.dto';
import { UpdateCityDto } from './dto/updateCity.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  getAll() {
    return this.cityService.findAll();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.cityService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateCityDto) {
    return this.cityService.create(data);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateCityDto) {
    return this.cityService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cityService.delete(id);
  }
}
