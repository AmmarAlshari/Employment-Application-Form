import { UserRoles } from 'src/common/enums/userroles.enum';
export declare class DashBoardUser {
    id: number;
    email: string;
    password: string;
    role: UserRoles;
    createdAt: Date;
    updateAt: Date;
}
