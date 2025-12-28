import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('qualifications')
export class Qualification{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qualificationName: string;

    @Column()
    qualificationNameAr: string;
    
}