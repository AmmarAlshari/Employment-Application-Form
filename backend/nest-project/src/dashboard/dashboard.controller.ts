import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DashboardUsersService } from './dashboard.service';
import { CreateDashboardUserDto } from './dto/create-user.dto';
import { Roles } from 'src/roles/roles.decorator';
import { UserRoles } from 'src/common/enums/userroles.enum';
import { RolesGuard } from '../roles/role.guard';
import { JwtAuthGuard } from '../auth/auth.gaurd';
import { DashBoardUser } from 'src/database/entities/dashboardusers.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.ADMIN, UserRoles.HR)
@Controller('dashboard')
export class DashboardController {
  constructor(private userRepo: DashboardUsersService) {}

  @Roles(UserRoles.ADMIN)
  @Post('users')
  createUser(@Body() dto: CreateDashboardUserDto) {
    return this.userRepo.createUser(dto);
  }

  @Get('users')
  getUsers(): Promise<DashBoardUser[]> {
    return this.userRepo.getUsers();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userRepo.deleteUser(id);
  }
}
