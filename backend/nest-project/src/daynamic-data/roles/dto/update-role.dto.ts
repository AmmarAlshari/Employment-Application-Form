import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDoto {
  @IsOptional()
  @IsString()
  roleName: string;
  @IsOptional()
  @IsString()
  roleNameAr: string;
}
