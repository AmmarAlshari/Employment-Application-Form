import { Roles } from 'src/roles/roles.decorator';
import { Application } from '../database/entities/application.entity';
import { ApplicationService } from './application.service';
import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserRoles } from 'src/common/enums/userroles.enum';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { RolesGuard } from 'src/roles/role.guard';

@Roles(UserRoles.ADMIN, UserRoles.HR)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ApplicationDashboard')
export class PrivateAppController {
  constructor(private readonly applicationService: ApplicationService) {}

  // get all applications

  @Get()
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  // update an application by status

  @Put(':id/status')
  updateApplicationStatus(
    @Param('id') id: number,
    @Body() body: { statusId: number },
  ): Promise<Application> {
    return this.applicationService.updateApplicationStatus(id, body.statusId);
  }

  @Delete(':id')
  deleteApplication(@Param('id') id: number) {
    return this.applicationService.deleteApplicationByStatus(id);
  }

  @Put(':id/assign')
  assignApplication(
    @Param('id') id: number,
    @Body() body: { assignedUserId: number },
  ) {
    return this.applicationService.assign(id, body.assignedUserId);
  }
}
