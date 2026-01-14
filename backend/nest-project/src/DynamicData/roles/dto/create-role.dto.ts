import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDoto {
  @IsNotEmpty()
  @IsString()
  roleName: string;
  @IsNotEmpty()
  @IsString()
  roleNameAr: string;
}