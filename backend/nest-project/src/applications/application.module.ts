import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { entities } from '../database/entities';
import { PublicAppController } from './public.controller';
import { PrivateAppController } from './dashboard.controler';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [PublicAppController, PrivateAppController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
