import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('selected_roles')
export class SelectedRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;
}
