import {Column , Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nationalities')

export class Nationality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    countryName: string;
}



