import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dashboard/dto/login-dto';
import { JwtAuthGuard } from './auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: LoginDto) {
    return this.authService.signin(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getMe(@Request() req) {
    return 'its public';
  }
}
