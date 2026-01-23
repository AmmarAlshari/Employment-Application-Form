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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dt';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { RolesGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { UserRoles } from 'src/common/enums/userroles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN, UserRoles.HR)
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getAll() {
    return this.statusService.findAll();
  }

  @Roles(UserRoles.ADMIN)
  @Post()
  create(@Body() data: CreateStatusDto) {
    return this.statusService.createStatus(data);
  }

  @Roles(UserRoles.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateStatusDto) {
    return this.statusService.updateStatus(id, data);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.statusService.delete(id);
  }
}
