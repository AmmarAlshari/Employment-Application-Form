import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { entities } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
