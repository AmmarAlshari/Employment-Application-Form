import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from './applications/application.module';
import { DynamicDataModule } from './dynamicdata/dynamicdata.module';
import { UploadsModule } from './uploads/upload.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DashboardUserModule } from './dashboard/dashboard.module';
@Module({
  imports: [
    DatabaseModule,
    ApplicationModule,
    DynamicDataModule,
    UploadsModule,
    AuthModule,
    DashboardUserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
