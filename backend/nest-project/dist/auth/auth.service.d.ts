import { DashboardUsersService } from 'src/dashboard/dashboard.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: DashboardUsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        role: import("../common/enums/userroles.enum").UserRoles;
        createdAt: Date;
        updateAt: Date;
    } | null>;
    signin(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
