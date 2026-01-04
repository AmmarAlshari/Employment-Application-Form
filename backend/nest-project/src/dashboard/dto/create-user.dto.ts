import { IsEnum, IsEmail, MinLength, IsString } from 'class-validator';
import { UserRoles } from 'src/common/enums/userroles.enum';

export class CreateDashboardUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(UserRoles)
  role: UserRoles;
}
