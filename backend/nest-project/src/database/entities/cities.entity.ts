import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cityName: string;

  @Column()
  cityNameAr: string;
}
