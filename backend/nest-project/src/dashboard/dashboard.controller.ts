import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DashboardUsersService } from './dashboard.service';
import { CreateDashboardUserDto } from './dto/create-user.dto';
import { Roles } from 'src/roles/roles.decorator';
import { UserRoles } from 'src/common/enums/userroles.enum';
import { RolesGuard } from '../roles/role.guard';
import { JwtAuthGuard } from '../auth/auth.gaurd';
import { DashBoardUser } from 'src/database/entities/dashboardusers.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(private createRepo: DashboardUsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Post('create/users')
  createUser(@Body() dto: CreateDashboardUserDto) {
    return this.createRepo.createUser(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Get('users')
  getUsers(): Promise<DashBoardUser[]> {
    return this.createRepo.getUsers();
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRoles.ADMIN)
  // @Get('admin-only')
  // adminOnly() {
  //   return 'Admin Only ';
  // }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRoles.HR)
  // @Get('hr-only')
  // hrOnly() {
  //   return 'HR Only ';
  // }
}
