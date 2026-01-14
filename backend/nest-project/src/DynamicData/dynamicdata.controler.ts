import { Body, Controller, Get, Post } from '@nestjs/common';
import { LookupsService } from './dynamicdata.service';
import { CreateCityDto } from './dto/createCity.dto';

@Controller('lookups')
export class LookupsController {
  constructor(private readonly LookupsService: LookupsService) {}

  @Get('cities')
  getCities() {
    return this.LookupsService.getCities();
  }

  @Get('nationalities')
  getNationalities() {
    return this.LookupsService.getNationalities();
  }

  @Get('selected-roles')
  getRoles() {
    return this.LookupsService.getRoles();
  }
  @Get('qualifications')
  getQualifications() {
    return this.LookupsService.getQualifications();
  }

  @Post('cities/create')
  createCity(@Body() dto: CreateCityDto) {
    return this.LookupsService.createCity(dto);
  }
}
