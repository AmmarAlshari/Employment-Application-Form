import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SelectedRole } from './selectedrole.entity';
import { City } from './cities.entity';
import { Nationality } from './nationality.entity';
import { Qualification } from './qaualification.entity';
import { Gender } from 'src/common/enums/gender.enum';
import { EnglishLevel } from 'src/common/enums/englishlevel.enum';
import { ApplicationStatus } from 'src/common/enums/application-status.enum';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 10 })
  nationalId: string;

  @Column({ length: 9 })
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'boolean', default: false })
  isFreshGraduate: boolean;

  @Column({ nullable: true })
  major?: string;

  @Column({ nullable: true })
  currentPosition?: string;

  @Column({ nullable: true, type: 'int' })
  experienceYears?: number;

  @Column({ type: 'enum', enum: EnglishLevel })
  experienceLevel: EnglishLevel;

  @Column({ type: 'text', nullable: true })
  otherRoleRemarks?: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @Column({ nullable: true })
  resumeUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.NEW,
  })
  ApplicationStatus: ApplicationStatus;

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

  @ManyToOne(() => City, {})
  @JoinColumn({ name: 'favorite_city_id' })
  favoriteCity?: City;

  @ManyToOne(() => Nationality, {})
  @JoinColumn({ name: 'nationality_id' })
  nationality?: Nationality;

  @ManyToOne(() => Qualification)
  @JoinColumn({ name: 'qualification_id' })
  qualification?: Qualification;
}
