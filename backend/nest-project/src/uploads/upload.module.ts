// uploads.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../database/entities/application.entity';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), MulterModule.register({
    dest: './storage'
  })],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
