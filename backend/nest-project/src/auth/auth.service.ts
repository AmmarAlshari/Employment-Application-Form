import { Injectable, NotFoundException } from '@nestjs/common';
import { DashboardUsersService } from 'src/dashboard/dashboard.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: DashboardUsersService,
    private jwtService: JwtService,
  ) {}

  //validate email and password

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  //signin user

  async signin(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);

    if (!user) throw new NotFoundException('Invalid Credentials');

    const payload = {
      sub: user?.id,
      email: user?.email,
      role: user?.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
