import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from './applications/application.module';
import { DynamicDataModule } from './DynamicData/dynamicdata.module';
@Module({
  imports: [DatabaseModule, ApplicationModule, DynamicDataModule],
})
export class AppModule {}
