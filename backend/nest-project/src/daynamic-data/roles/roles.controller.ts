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
import { RolesService } from './roles.service';
import { CreateRoleDoto } from './dto/create-role.dto';
import { UpdateRoleDoto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { RolesGuard } from 'src/roles/role.guard';
import { UserRoles } from 'src/common/enums/userroles.enum';
import { Roles } from 'src/roles/roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  getAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Post()
  create(@Body() data: CreateRoleDoto) {
    return this.roleService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateRoleDoto) {
    return this.roleService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
