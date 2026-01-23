import { UserRoles } from 'src/common/enums/userroles.enum';
import { Application } from './application.entity';
export declare class DashBoardUser {
    id: number;
    email: string;
    password: string;
    role: UserRoles;
    createdAt: Date;
    updateAt: Date;
    assignedApplications: Application[];
}
