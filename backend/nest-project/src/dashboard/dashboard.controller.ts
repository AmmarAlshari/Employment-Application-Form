import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DashboardUsersService } from './dashboard.service';
import { CreateDashboardUserDto } from './dto/create-user.dto';
import { Roles } from 'src/roles/roles.decorator';
import { UserRoles } from 'src/common/enums/userroles.enum';
import { RolesGuard } from '../roles/role.guard';
import { JwtAuthGuard } from '../auth/auth.gaurd';

@Controller('dashboard')
export class DashboardController {
  constructor(private createRepo: DashboardUsersService) {}

  @Post('signup')
  signup(@Body() dto: CreateDashboardUserDto) {
    return this.createRepo.createUser(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Get('admin-only')
  adminOnly() {
    return 'Admin Only ';
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.HR)
  @Get('hr-only')
  hrOnly() {
    return 'HR Only ';
  }
}
