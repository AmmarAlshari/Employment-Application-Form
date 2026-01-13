import { DashboardUsersService } from './dashboard.service';
import { CreateDashboardUserDto } from './dto/create-user.dto';
import { DashBoardUser } from 'src/database/entities/dashboardusers.entity';
export declare class DashboardController {
    private createRepo;
    constructor(createRepo: DashboardUsersService);
    signup(dto: CreateDashboardUserDto): Promise<DashBoardUser>;
    getUsers(): Promise<DashBoardUser[]>;
    adminOnly(): string;
    hrOnly(): string;
}
