import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/database/entities/cities.entity';
import { Nationality } from 'src/database/entities/nationality.entity';
import { Qualification } from 'src/database/entities/qaualification.entity';
import { SelectedRole } from 'src/database/entities/selectedrole.entity';
import { CityController } from './city/city.controller';
import { NationalityController } from './nationality/nationality.controller';
import { RolesController } from './roles/roles.controller';
import { QualificationsController } from './qualifications/qualifications.controller';
import { CityService } from './city/city.service';
import { NationalityService } from './nationality/nationality.service';
import { RolesService } from './roles/roles.service';
import { QualificationsService } from './qualifications/qualifications.service';
import { StatusService } from './status/status.service';
import { StatusController } from './status/status.controller';
import { Status } from 'src/database/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      City,
      Nationality,
      Qualification,
      SelectedRole,
      Status,
    ]),
  ],
  controllers: [
    CityController,
    NationalityController,
    RolesController,
    QualificationsController,
    StatusController,
  ],
  providers: [
    CityService,
    NationalityService,
    RolesService,
    QualificationsService,
    StatusService,
  ],
})
export class DynamicDataModule {}
