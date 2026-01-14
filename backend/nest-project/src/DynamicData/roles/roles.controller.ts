import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDoto } from './dto/create-role.dto';
import { UpdateRoleDoto } from './dto/update-role.dto';

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

  @Post()
  create(@Body() data: CreateRoleDoto) {
    return this.roleService.create(data);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateRoleDoto) {
    return this.roleService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
