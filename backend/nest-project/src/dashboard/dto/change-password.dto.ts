import { IsString, MinLength } from 'class-validator';

export class ChangePassowrdDoto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
