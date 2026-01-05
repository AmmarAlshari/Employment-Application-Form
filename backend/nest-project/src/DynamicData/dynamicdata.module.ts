import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../database/entities';
import { LookupsService } from './dynamicdata.service';
import { LookupsController } from './dynamicdata.controler';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [LookupsController],
  providers: [LookupsService],
})
export class DynamicDataModule {}
