import { IsEnum } from 'class-validator';
import { UserRoles } from 'src/common/enums/userroles.enum';

export class UpdateUserRoleDto {
  @IsEnum(UserRoles)
  role: UserRoles;
}
