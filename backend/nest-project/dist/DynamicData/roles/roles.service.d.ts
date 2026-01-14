import { SelectedRole } from 'src/database/entities/selectedrole.entity';
import { Repository } from 'typeorm';
import { CreateRoleDoto } from './dto/create-role.dto';
import { UpdateRoleDoto } from './dto/update-role.dto';
export declare class RolesService {
    private readonly roleRepo;
    constructor(roleRepo: Repository<SelectedRole>);
    findAll(): Promise<SelectedRole[]>;
    findOne(id: number): void;
    create(data: CreateRoleDoto): Promise<SelectedRole>;
    update(id: number, data: UpdateRoleDoto): Promise<void>;
    delete(id: number): Promise<{
        deleted: boolean;
    }>;
}
