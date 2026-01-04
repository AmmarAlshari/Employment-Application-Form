import { IsEnum } from 'class-validator';
import { ApplicationService } from '../application.service';

export class UpdateApplicationStatus {
  @IsEnum(ApplicationService)
  applicationStatus: ApplicationService;
}
