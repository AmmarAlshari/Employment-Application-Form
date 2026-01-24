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
import { NationalityService } from './nationality.service';
import { CreateNationalityDto } from './dto/create-nationalty.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { RolesGuard } from 'src/roles/role.guard';
import { UserRoles } from 'src/common/enums/userroles.enum';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Post()
  create(@Body() data: CreateNationalityDto) {
    return this.natService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateNationalityDto) {
    return this.natService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.natService.delete(id);
  }
}
