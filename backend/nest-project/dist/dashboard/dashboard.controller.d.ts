import { DashboardUsersService } from './dashboard.service';
import { CreateDashboardUserDto } from './dto/create-user.dto';
import { DashBoardUser } from 'src/database/entities/dashboardusers.entity';
export declare class DashboardController {
    private userRepo;
    constructor(userRepo: DashboardUsersService);
    createUser(dto: CreateDashboardUserDto): Promise<DashBoardUser>;
    getUsers(): Promise<DashBoardUser[]>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
