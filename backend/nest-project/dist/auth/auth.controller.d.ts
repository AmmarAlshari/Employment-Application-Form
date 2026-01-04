import { AuthService } from './auth.service';
import { LoginDto } from 'src/dashboard/dto/login-dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    getMe(req: any): string;
}
