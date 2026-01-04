import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashBoardUser } from 'src/database/entities/dashboardusers.entity';
import { DashboardUsersService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DashBoardUser]),
    forwardRef(() => AuthModule),
  ],
  controllers: [DashboardController],
  providers: [DashboardUsersService],
  exports: [DashboardUsersService],
})
export class DashboardUserModule {}
