import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dt';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getAll() {
    return this.statusService.findAll();
  }

  @Post()
  create(@Body() data: CreateStatusDto) {
    return this.statusService.createStatus(data);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateStatusDto) {
    return this.statusService.updateStatus(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.statusService.delete(id);
  }
}
