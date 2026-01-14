import { RolesService } from './roles.service';
import { CreateRoleDoto } from './dto/create-role.dto';
import { UpdateRoleDoto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly roleService;
    constructor(roleService: RolesService);
    getAll(): Promise<import("../../database/entities/selectedrole.entity").SelectedRole[]>;
    getOne(id: number): void;
    create(data: CreateRoleDoto): Promise<import("../../database/entities/selectedrole.entity").SelectedRole>;
    update(id: number, data: UpdateRoleDoto): Promise<void>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
