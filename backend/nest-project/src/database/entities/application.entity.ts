import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { SelectedRole } from './selectedrole.entity';
import { City } from './cities.entity';
import { Nationality } from './nationality.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 9 })
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;

  @Column({ default: false })
  isFreshGraduate: boolean;

  @Column({ nullable: true })
  qualification?: string;

  @Column({ nullable: true })
  major?: string;

  @Column({ nullable: true })
  currentPosition?: string;

  @Column({ nullable: true })
  experienceYears?: number;

  @Column()
  experienceLevel: string;

  @Column({ type: 'text', nullable: true })
  otherRoleRemarks?: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @ManyToMany(() => SelectedRole)
  @JoinTable({
    name: 'user_selected_roles',
    joinColumn: {
      name: 'application_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'selected_role_id',
      referencedColumnName: 'id',
    },
  })
  selectedRoles: SelectedRole[];

  @ManyToOne(() => City, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'favorite_city_id' })
  favoriteCity?: City;

  @ManyToOne(() => Nationality, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'nationality_id' })
  nationality?: Nationality;
}
