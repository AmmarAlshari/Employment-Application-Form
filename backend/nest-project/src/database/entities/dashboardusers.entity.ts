import { UserRoles } from 'src/common/enums/userroles.enum';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from 'typeorm';
import { Application } from './application.entity';

@Entity('dashboard_users')
export class DashBoardUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({})
  password: string;

  @Column({ type: 'enum', enum: UserRoles })
  role: UserRoles;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
  
  @OneToMany(() => Application, app => app.assignedBy)
  assignedApplications: Application[];

}
