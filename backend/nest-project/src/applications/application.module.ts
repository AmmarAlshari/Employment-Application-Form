import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { PublicAppController } from './public.controller';
import { PrivateAppController } from './dashboard.controler';
import { Application } from 'src/database/entities/application.entity';
import { Nationality } from 'src/database/entities/nationality.entity';
import { Qualification } from 'src/database/entities/qaualification.entity';
import { SelectedRole } from 'src/database/entities/selectedrole.entity';
import { Status } from 'src/database/entities/status.entity';
import { City } from 'src/database/entities/cities.entity';
import { DashBoardUser } from 'src/database/entities/dashboardusers.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      Nationality,
      Qualification,
      SelectedRole,
      Status,
      City,
      DashBoardUser,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PublicAppController, PrivateAppController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
