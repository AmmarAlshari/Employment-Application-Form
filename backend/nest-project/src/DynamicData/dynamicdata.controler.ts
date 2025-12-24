import { Controller, Get} from '@nestjs/common';
import { LookupsService } from './dynamicdata.service';

@Controller('lookups')
export class LookupsController {
  constructor(private readonly LookupsService: LookupsService) {}

  @Get('cities')
  getCities() {
    return this.LookupsService.getCities();
  }

  @Get('nationalities')
  getNationalities() {
    return this.LookupsService.getNationalities();
  }

  @Get('selected-roles')
  getRoles() {
    return this.LookupsService.getRoles();
  }
}
