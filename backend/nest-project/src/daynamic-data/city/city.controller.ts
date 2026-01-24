import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/createCity.dto';
import { UpdateCityDto } from './dto/updateCity.dto';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { RolesGuard } from 'src/roles/role.guard';
import { UserRoles } from 'src/common/enums/userroles.enum';
import { Roles } from 'src/roles/roles.decorator';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Post()
  create(@Body() data: CreateCityDto) {
    return this.cityService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateCityDto) {
    return this.cityService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cityService.delete(id);
  }
}
