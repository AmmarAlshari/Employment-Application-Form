import { DashboardUsersService } from './dashboard.service';
import { CreateDashboardUserDto } from './dto/create-user.dto';
export declare class DashboardController {
    private createRepo;
    constructor(createRepo: DashboardUsersService);
    signup(dto: CreateDashboardUserDto): Promise<import("../database/entities/dashboardusers.entity").DashBoardUser>;
    adminOnly(): string;
    hrOnly(): string;
}
