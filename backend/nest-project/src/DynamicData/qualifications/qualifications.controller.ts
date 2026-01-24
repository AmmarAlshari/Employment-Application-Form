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
import { QualificationsService } from './qualifications.service';
import { CreateQualificationDto } from './dto/create-qual.dto';
import { UpdateQualificationDto } from './dto/update-qual.dto';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { RolesGuard } from 'src/roles/role.guard';
import { UserRoles } from 'src/common/enums/userroles.enum';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Post()
  create(@Body() data: CreateQualificationDto) {
    return this.qualService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateQualificationDto) {
    return this.qualService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.qualService.delete(id);
  }
}
