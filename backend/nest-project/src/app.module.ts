import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from './applications/application.module';
import { DynamicDataModule } from './dynamicdata/dynamicdata.module';
import { UploadsModule } from './uploads/upload.module';
@Module({
  imports: [
    DatabaseModule,
    ApplicationModule,
    DynamicDataModule,
    UploadsModule,
  ],
})
export class AppModule {}
