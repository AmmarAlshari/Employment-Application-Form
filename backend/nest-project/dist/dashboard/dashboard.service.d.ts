import { DashBoardUser } from 'src/database/entities/dashboardusers.entity';
import { Repository } from 'typeorm';
import { CreateDashboardUserDto } from './dto/create-user.dto';
export declare class DashboardUsersService {
    private userRepo;
    constructor(userRepo: Repository<DashBoardUser>);
    createUser(user: CreateDashboardUserDto): Promise<DashBoardUser>;
    findUserByEmail(email: string): Promise<DashBoardUser | null>;
}
