import { IsInt } from 'class-validator';
export class UpdateApplicationDto {
  @IsInt()
  statusId: number;
}
